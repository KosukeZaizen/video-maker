import * as React from "react";
import { useEffect, useState } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import { audioPlayAsync } from "../../../common/util/audio/audioPlayAsync";
import CharacterComment from "../../shared/CharacterComment";
import { vocab } from "../types/vocab";

export function ListPage({
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

    useEffect(() => {
        const play = async () => {
            const initialSeason = season;
            for (let i in vocabList) {
                const { vocabId } = vocabList[i];

                if (!isOneSeason) {
                    setSeason(vocabSeasons[vocabId]);
                }

                setCurrentVocab(vocabList[i]);
                const audio = vocabSounds[vocabId];
                await audioPlayAsync(audio);
                await sleepAsync(2000);
                await audioPlayAsync(audio);
                await sleepAsync(2000);
            }
            setSeason(initialSeason);
            changePage(Page.quiz);
        };
        play();
    }, []);

    const pStyle = { margin: "0 0 30px" };

    return (
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
                <p style={pStyle}>{currentVocab.english}</p>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 20 }}>
                <CharacterComment
                    imgNumber={2}
                    comment={
                        <p
                            style={{
                                fontSize: "x-large",
                                minWidth: 273,
                                margin: 0,
                            }}
                        >
                            {"Remember these words"}
                            <br />
                            {"before the quiz!"}
                        </p>
                    }
                    imgStyle={{ width: 95 }}
                    screenWidth={screenWidth / 2}
                    commentStyle={{
                        marginLeft: 15,
                        paddingLeft: 30,
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
        </div>
    );
}