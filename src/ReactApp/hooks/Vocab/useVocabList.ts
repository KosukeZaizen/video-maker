import { useEffect, useState } from "react";
import { BLOB_URL, Z_APPS_TOP_URL } from "../../common/consts";
import { getAudio } from "../../common/util/audio/getAudio";
import {
    sound,
    vocab,
    vocabGenre,
    VocabGenreId,
    vocabMergedGenre,
} from "../../components/Vocab/types/vocab";

const initialVocabGenre: vocabGenre = {
    genreId: VocabGenreId(0),
    genreName: "",
    order: 0,
    youtube: "",
    released: false,
};

export function useVocabList(genreName: string, isMerged?: boolean) {
    const [vocabGenre, setVocabGenre] = useState<vocabGenre | vocabMergedGenre>(
        initialVocabGenre
    );
    const [vocabList, setVocabList] = useState<vocab[]>([]);
    const [vocabSounds, setVocabSounds] = useState<sound[]>([]);

    useEffect(() => {
        (isMerged ? mergedFetch : nonMergedFetch)(
            genreName,
            setVocabGenre,
            setVocabList,
            setVocabSounds
        );
    }, [isMerged]);

    return { vocabGenre, vocabList, vocabSounds };
}

const nonMergedFetch = async (
    genreName: string,
    setVocabGenre: (vocabGenre: vocabGenre) => void,
    setVocabList: (vocabList: vocab[]) => void,
    setVocabSounds: (vocabSounds: sound[]) => void
) => {
    // set vocabGenre and vocabList
    const res = await fetch(
        `${Z_APPS_TOP_URL}/api/VocabQuiz/GetQuizDataWithoutCache/${genreName}`
    );
    const {
        vocabList,
        vocabGenre,
    }: {
        vocabList: vocab[];
        vocabGenre: vocabGenre;
    } = await res.json();
    setVocabGenre(vocabGenre);
    setVocabList(vocabList);

    // set vocabSounds
    const vocabSounds: sound[] = [];
    vocabList.length > 0 &&
        vocabList.forEach((v: vocab) => {
            vocabSounds[v.vocabId] = getAudio({
                src: `${BLOB_URL}/vocabulary-quiz/audio/${vocabGenre.genreName}/Japanese-vocabulary${v.vocabId}.m4a`,
            });
        });
    setVocabSounds(vocabSounds);
};

const mergedFetch = async (
    genreName: string,
    setVocabGenre: (vocabGenre: vocabMergedGenre) => void,
    setVocabList: (vocabList: vocab[]) => void,
    setVocabSounds: (vocabSounds: sound[]) => void
) => {
    // set vocabGenre and vocabList
    const res1 = fetch(
        `${Z_APPS_TOP_URL}/api/VocabQuiz/GetMergedGenreAndVocab/${genreName}`
    );
    const res2 = fetch(`${Z_APPS_TOP_URL}/api/VocabQuiz/GetAllGenresForEdit`);
    const {
        mergedVocabList,
        vocabMergedGenre,
    }: {
        mergedVocabList: vocab[];
        vocabMergedGenre: vocabMergedGenre;
    } = await (await res1).json();

    setVocabGenre(vocabMergedGenre);

    const allGenres: vocabGenre[] = await (await res2).json();

    // set vocabSounds
    const vocabSounds: sound[] = [];
    mergedVocabList.length > 0 &&
        mergedVocabList.forEach((v, i) => {
            const genreName =
                allGenres.find(g => g.genreId === v.genreId)?.genreName || "";
            vocabSounds[i + 1] = getAudio({
                src: `${BLOB_URL}/vocabulary-quiz/audio/${genreName}/Japanese-vocabulary${v.vocabId}.m4a`,
            });
            v.vocabId = i + 1;
        });
    setVocabSounds(vocabSounds);
    setVocabList(mergedVocabList);
};
