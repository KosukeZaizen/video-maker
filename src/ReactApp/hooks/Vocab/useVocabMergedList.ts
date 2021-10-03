import { useEffect, useState } from "react";
import { BLOB_URL, Z_APPS_TOP_URL } from "../../common/consts";
import { getAudio } from "../../common/util/audio/getAudio";
import {
    sound,
    vocab,
    vocabGenre,
    vocabMergedGenre,
    VocabMergedGenreId,
} from "../../components/Vocab/types/vocab";

const initialVocabGenre: vocabMergedGenre = {
    genreId: VocabMergedGenreId(0),
    genreName: "",
    order: 0,
    youtube: "",
};

export function useVocabMergedList(genreName: string) {
    const [vocabGenre, setVocabGenre] =
        useState<vocabMergedGenre>(initialVocabGenre);
    const [vocabList, setVocabList] = useState<vocab[]>([]);
    const [vocabSounds, setVocabSounds] = useState<sound[]>([]);

    useEffect(() => {
        (async () => {
            // set vocabGenre and vocabList
            const res1 = fetch(
                `${Z_APPS_TOP_URL}/api/VocabQuiz/GetMergedGenreAndVocab/${genreName}`
            );
            const res2 = fetch(
                `${Z_APPS_TOP_URL}/api/VocabQuiz/GetAllGenresForEdit`
            );
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
                        allGenres.find(g => g.genreId === v.genreId)
                            ?.genreName || "";
                    vocabSounds[i + 1] = getAudio({
                        src: `${BLOB_URL}/vocabulary-quiz/audio/${genreName}/Japanese-vocabulary${v.vocabId}.m4a`,
                    });
                    v.vocabId = i + 1;
                });
            setVocabSounds(vocabSounds);
            setVocabList(mergedVocabList);
        })();
    }, []);

    return { vocabGenre, vocabList, vocabSounds };
}
