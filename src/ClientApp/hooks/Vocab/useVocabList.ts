import { useEffect, useState } from "react";
import { BLOB_URL, Z_APPS_TOP_URL } from "../../common/consts";
import { getAudio } from "../../common/util/audio/getAudio";
import { sound, vocab, vocabGenre } from "../../components/Vocab/types/vocab";

const initialVocabGenre = {
    genreId: 0,
    genreName: "",
    order: 0,
    youtube: "",
    released: false,
};

export function useVocabList(genreName: string) {
    const [vocabGenre, setVocabGenre] = useState<vocabGenre>(initialVocabGenre);
    const [vocabList, setVocabList] = useState<vocab[]>([]);
    const [vocabSounds, setVocabSounds] = useState<sound[]>([]);

    useEffect(() => {
        (async () => {
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
        })();
    }, []);

    return { vocabGenre, vocabList, vocabSounds };
}
