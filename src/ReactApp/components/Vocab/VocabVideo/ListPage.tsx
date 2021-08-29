import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import { audioPlayAsync } from "../../../common/util/audio/audioPlayAsync";
import CharacterComment from "../../shared/CharacterComment";
import { vocab } from "../types/vocab";

const styles = {
    outsideDiv: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 90,
    },
    pStyle: { margin: "0 0 30px" },
    listContentDiv: { marginBottom: 10, textAlign: "center" },
    outsideCharacterComment: { position: "absolute", bottom: 0, left: 20 },
    commentP: {
        fontSize: "x-large",
        minWidth: 273,
        margin: 0,
    },
    characterImg: { width: 95 },
    commentStyle: {
        marginLeft: 15,
        paddingLeft: 30,
        width: 300,
    },
    progress: {
        position: "absolute",
        top: 10,
        left: 20,
        fontSize: 40,
    },
} as const;

export function ListPage({
    screenWidth,
    ...currentVocabProps
}: {
    screenWidth: number;
} & CurrentVocabProps) {
    const { currentVocab, progress, showAnswer } =
        useCurrentVocab(currentVocabProps);

    const redPStyle = useMemo(
        () =>
            ({
                color: "red",
                opacity: showAnswer ? 1 : 0,
                transition: "500ms",
                ...styles.pStyle,
            } as const),
        [showAnswer]
    );

    return (
        <div style={styles.outsideDiv}>
            <div style={styles.listContentDiv}>
                <p style={styles.pStyle}>{currentVocab.kanji}</p>
                <p style={styles.pStyle}>{currentVocab.hiragana}</p>
                <p key={currentVocab.vocabId} style={redPStyle}>
                    {currentVocab.english}
                </p>
            </div>
            <div style={styles.outsideCharacterComment}>
                <CharacterComment
                    imgNumber={2}
                    comment={
                        <p style={styles.commentP}>
                            {"Remember these words"}
                            <br />
                            {"before the quiz!"}
                        </p>
                    }
                    imgStyle={styles.characterImg}
                    screenWidth={screenWidth / 2}
                    commentStyle={styles.commentStyle}
                />
            </div>
            <div style={styles.progress}>{progress}</div>
        </div>
    );
}

interface CurrentVocabProps {
    changePage: ChangePage;
    vocabList: vocab[];
    vocabSounds: HTMLAudioElement[];
    vocabSeasons: string[];
    isOneSeason: boolean;
    setSeason: (season: string) => void;
    season: string;
}

function useCurrentVocab({
    changePage,
    vocabList,
    vocabSounds,
    vocabSeasons,
    isOneSeason,
    setSeason,
    season,
}: CurrentVocabProps) {
    const [currentVocab, setCurrentVocab] = useState(vocabList[0]);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        (async () => {
            const initialSeason = season;
            for (let i in vocabList) {
                const { vocabId } = vocabList[i];

                if (!isOneSeason) {
                    setSeason(vocabSeasons[vocabId]);
                }

                setCurrentVocab(vocabList[i]);
                const audio = vocabSounds[vocabId];
                await audioPlayAsync(audio);
                setShowAnswer(true);
                await sleepAsync(2000);
                await audioPlayAsync(audio);
                await sleepAsync(2000);
                setShowAnswer(false);
            }
            setSeason(initialSeason);
            changePage(Page.quiz);
        })();
    }, []);

    const progress = useMemo(
        () => `${vocabList.indexOf(currentVocab) + 1} / ${vocabList.length}`,
        [vocabList, currentVocab]
    );

    return { currentVocab, progress, showAnswer };
}
