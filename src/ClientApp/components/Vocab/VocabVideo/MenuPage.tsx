import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { ChangePage, Page } from ".";
import { getFallingImages } from "../../shared/Animations/SeasonAnimation";
import { FallingImageEdit } from "../../shared/Animations/SeasonAnimation/FallingImageEdit";
import { BackButton } from "../../shared/BackButton";
import { sound, vocab } from "../types/vocab";

export function MenuPage({
    changePage,
    vocabSounds,
    music,
    setSeason,
    setVocabSeason,
    setVocabSeasons,
    vocabList,
    isOneSeason,
    setIsOneSeason,
    vocabSeasons,
    startRecording,
}: {
    changePage: ChangePage;
    vocabSounds: sound[];
    music?: sound;
    setSeason: (season: string) => void;
    setVocabSeason: (vocabId: number, season: string) => void;
    setVocabSeasons: (vocabSeasons: string[]) => void;
    vocabList: vocab[];
    isOneSeason: boolean;
    setIsOneSeason: (isOneSeason: boolean) => void;
    vocabSeasons: string[];
    startRecording: () => void;
}) {
    const [isButtonShown, setIsButtonShown] = useState(true);
    const [playableArray, setPlayableArray] = useState(
        vocabSounds.map(s => s.playable)
    );
    const [musicPlayable, setMusicPlayable] = useState(false);
    const [seasonNames, setSeasonNames] = useState<string[]>([]);
    const [isAnimationStopped, setIsAnimationStopped] = useState(true);

    const mountState = useMemo(() => {
        const mountState = { unmounted: false };
        return {
            setUnmounted: (unmounted: boolean) => {
                mountState.unmounted = unmounted;
            },
            checkUnmounted: () => mountState.unmounted,
        };
    }, []);

    useEffect(() => {
        mountState.setUnmounted(false);
        return () => {
            mountState.setUnmounted(true);
        };
    }, []);

    const { checkUnmounted } = mountState;

    useEffect(() => {
        vocabSounds.forEach(vocabSound => {
            vocabSound.audio.oncanplaythrough = () => {
                vocabSound.playable = true;
                if (!checkUnmounted()) {
                    setPlayableArray(vocabSounds.map(s => s.playable));
                }
            };
            vocabSound.audio.load();
        });
    }, [vocabSounds, checkUnmounted]);

    useEffect(() => {
        if (!music) {
            return;
        }
        music.audio.oncanplaythrough = () => {
            music.playable = true;
            if (!checkUnmounted()) {
                setMusicPlayable(true);
            }
        };
        music.audio.load();
    }, [music, checkUnmounted]);

    useEffect(() => {
        (async () => {
            const seasons = await getFallingImages();
            if (!checkUnmounted()) {
                setSeasonNames(seasons.map(s => s.name));
            }
        })();
    }, [checkUnmounted]);

    const playableCount = playableArray.filter(p => p).length;
    const totalCount = vocabSounds.filter(s => s).length;

    return isButtonShown ? (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <BackButton />
            <p
                style={{ margin: 10 }}
            >{`Loaded Audio: ${playableCount} / ${totalCount}`}</p>

            <p style={{ margin: 10 }}>{`Music: ${
                musicPlayable ? "OK!" : "Loading..."
            }`}</p>

            {playableCount === totalCount &&
                musicPlayable &&
                seasonNames.length && (
                    <button
                        style={{ margin: 10 }}
                        onClick={() => {
                            setTimeout(() => {
                                changePage(Page.title);
                                startRecording();
                            }, 3000);
                            if (!checkUnmounted()) {
                                setIsAnimationStopped(false);
                                setIsButtonShown(false);
                            }
                        }}
                    >
                        Video Start
                    </button>
                )}

            <div style={{ display: "flex" }}>
                <div style={{ border: "solid", margin: 20, padding: 20 }}>
                    <input
                        type="checkbox"
                        checked={isOneSeason}
                        style={{ marginRight: 10 }}
                        onChange={() => {
                            setIsOneSeason(!isOneSeason);
                            if (isOneSeason) {
                                const vocabSeasons = vocabList.reduce<string[]>(
                                    (acc, val) => {
                                        const seasons = [...acc];
                                        seasons[val.vocabId] = "none";
                                        return seasons;
                                    },
                                    []
                                );
                                setVocabSeasons(vocabSeasons);
                            }
                        }}
                    />
                    {"動画全体で単一のSeasonとする"}
                    <div style={{ display: "flex", margin: 20 }}>
                        <div>{"Base season:"}</div>
                        <select
                            onChange={ev => {
                                setSeason(ev.target.value);
                            }}
                        >
                            {seasonNames.map(s => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    {!isOneSeason && (
                        <table style={{ margin: "20px 40px 0" }}>
                            <tbody>
                                {vocabList.map(v => (
                                    <tr key={v.vocabId}>
                                        <td>{v.kanji}</td>
                                        <td>
                                            <select
                                                value={vocabSeasons[v.vocabId]}
                                                onChange={ev => {
                                                    setVocabSeason(
                                                        v.vocabId,
                                                        ev.target.value
                                                    );
                                                }}
                                            >
                                                {seasonNames.map(s => (
                                                    <option key={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ border: "solid", margin: 20, padding: 10 }}>
                        <p>途中から再生</p>
                        <button
                            style={{ margin: 10 }}
                            onClick={() => {
                                changePage(Page.list);
                            }}
                        >
                            List Page
                        </button>
                        <button
                            style={{ margin: 10 }}
                            onClick={() => {
                                changePage(Page.quiz);
                            }}
                        >
                            Quiz Page
                        </button>
                        <button
                            style={{ margin: 10 }}
                            onClick={() => {
                                changePage(Page.last);
                            }}
                        >
                            Last Page
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            changePage(Page.thumbnail);
                        }}
                        style={{ margin: "0 20px" }}
                    >
                        {"サムネイル用画面"}
                    </button>
                </div>
            </div>
            <FallingImageEdit />
        </div>
    ) : null;
}
