import * as React from "react";
import { useEffect, useState } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import { audioPlayAsync } from "../../../common/util/audio/audioPlayAsync";
import CharacterComment from "../../shared/CharacterComment";
import { vocab } from "../types/vocab";

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

    const pStyle = { margin: "0 0 30px" };

    return isInitialScreen ? (
        <CharacterComment
            imgNumber={1}
            comment={
                <p
                    style={{
                        fontSize: 65,
                        margin: 0,
                        padding: 10,
                        fontWeight: "bold",
                    }}
                >
                    {"Let's start the quiz!"}
                </p>
            }
            style={{ maxWidth: 1000 }}
            screenWidth={screenWidth}
            commentStyle={{
                fontSize: 100,
                maxWidth: 900,
                width: 700,
                marginLeft: 40,
                textAlign: "center",
            }}
        />
    ) : (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 90,
            }}
        >
            <div style={{ marginBottom: 10, textAlign: "center" }}>
                <p style={pStyle}>{currentVocab.kanji}</p>
                <p style={pStyle}>{currentVocab.hiragana}</p>
                <p
                    key={currentVocab.vocabId}
                    style={{
                        color: "red",
                        opacity: showAnswer ? 1 : 0,
                        transition: "500ms",
                        ...pStyle,
                    }}
                >
                    {currentVocab.english}
                </p>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 20 }}>
                <CharacterComment
                    imgNumber={3}
                    comment={
                        <p
                            style={{
                                fontSize: "x-large",
                                margin: 0,
                                paddingLeft: 5,
                            }}
                        >
                            {"Do you remember the meaning?"}
                        </p>
                    }
                    imgStyle={{ width: 95 }}
                    screenWidth={screenWidth / 2}
                    commentStyle={{
                        marginLeft: 15,
                        paddingLeft: 25,
                        width: 300,
                    }}
                />
            </div>
            <div
                style={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    fontSize: 40,
                }}
            >
                {`${vocabList.indexOf(currentVocab) + 1} / ${vocabList.length}`}
            </div>
            {count < 4 && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 50,
                        fontSize: 100,
                    }}
                >
                    {count}
                </div>
            )}
        </div>
    );
}
