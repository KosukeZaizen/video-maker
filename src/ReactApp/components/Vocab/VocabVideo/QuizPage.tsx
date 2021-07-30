import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import { audioPlayAsync } from "../../../common/util/audio/audioPlayAsync";
import CharacterComment from "../../shared/CharacterComment";
import { vocab } from "../types/vocab";

const styles = {
    pStyle: { margin: "0 0 30px" },
    commentP: {
        fontSize: 65,
        margin: 0,
        padding: 10,
        fontWeight: "bold",
    },
    characterComment: { maxWidth: 1000 },
    comment: {
        fontSize: 100,
        maxWidth: 900,
        width: 700,
        marginLeft: 40,
        textAlign: "center",
    },
    outsideDiv: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 90,
    },
    quizContentsDiv: { marginBottom: 10, textAlign: "center" },
    characterOutsideDiv: { position: "absolute", bottom: 0, left: 20 },
    askingCommentP: {
        fontSize: "x-large",
        margin: 0,
        paddingLeft: 5,
    },
    askingCharacterImg: { width: 95 },
    askingComment: {
        marginLeft: 15,
        paddingLeft: 25,
        width: 300,
    },
    progress: {
        position: "absolute",
        top: 10,
        left: 20,
        fontSize: 40,
    },
    count: {
        position: "absolute",
        top: 0,
        right: 50,
        fontSize: 100,
    },
} as const;

export function QuizPage({
    screenWidth,
    changePage,
    vocabList,
    vocabSounds,
    vocabSeasons,
    isOneSeason,
    setSeason,
    season,
}: {
    screenWidth: number;
    changePage: ChangePage;
    vocabList: vocab[];
    vocabSounds: HTMLAudioElement[];
    vocabSeasons: string[];
    isOneSeason: boolean;
    setSeason: (season: string) => void;
    season: string;
}) {
    const [currentVocab, setCurrentVocab] = useState(vocabList[0]);
    const [isInitialScreen, setIsInitialScreen] = useState(true);
    const [count, setCount] = useState(4);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const play = async () => {
            const initialSeason = season;

            for (let i in vocabList) {
                const { vocabId } = vocabList[i];

                if (!isOneSeason) {
                    setSeason("question");
                }

                setCurrentVocab(vocabList[i]);
                const audio = vocabSounds[vocabId];
                await audioPlayAsync(audio);
                await sleepAsync(3000);
                setCount(3);
                await sleepAsync(1000);
                setCount(2);
                await sleepAsync(1000);
                setCount(1);
                await sleepAsync(1000);
                setCount(4);

                // 回答表示
                if (!isOneSeason) {
                    setSeason(vocabSeasons[vocabId]);
                }
                setShowAnswer(true);
                await audioPlayAsync(audio);
                await sleepAsync(2000);
                setShowAnswer(false);
            }
            setSeason(initialSeason);
            changePage(Page.last);
        };
        setTimeout(() => {
            setIsInitialScreen(false);
            play();
        }, 5000);
    }, []);

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

    const progress = useMemo(
        () => `${vocabList.indexOf(currentVocab) + 1} / ${vocabList.length}`,
        [vocabList, currentVocab]
    );

    return isInitialScreen ? (
        <CharacterComment
            imgNumber={1}
            comment={<p style={styles.commentP}>{"Let's start the quiz!"}</p>}
            style={styles.characterComment}
            screenWidth={screenWidth}
            commentStyle={styles.comment}
        />
    ) : (
        <div style={styles.outsideDiv}>
            <div style={styles.quizContentsDiv}>
                <p style={styles.pStyle}>{currentVocab.kanji}</p>
                <p style={styles.pStyle}>{currentVocab.hiragana}</p>
                <p key={currentVocab.vocabId} style={redPStyle}>
                    {currentVocab.english}
                </p>
            </div>
            <div style={styles.characterOutsideDiv}>
                <CharacterComment
                    imgNumber={3}
                    comment={
                        <p style={styles.askingCommentP}>
                            {"Do you remember the meaning?"}
                        </p>
                    }
                    imgStyle={styles.askingCharacterImg}
                    screenWidth={screenWidth / 2}
                    commentStyle={styles.askingComment}
                />
            </div>
            <div style={styles.progress}>{progress}</div>
            {count < 4 && <div style={styles.count}>{count}</div>}
        </div>
    );
}
