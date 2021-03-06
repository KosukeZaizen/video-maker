import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChangePage, Page } from ".";
import { staticFolderPath } from "../../../common/consts";
import { imgSrc } from "../../../common/imgSrc";
import { getFallingImages } from "../../shared/Animations/FallingAnimation";
import { FallingImageEdit } from "../../shared/Animations/FallingAnimation/FallingImageEdit";
import { Video } from "../../shared/Video";
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
    genreName,
    isMerged,
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
    genreName: string;
    isMerged: boolean;
}) {
    const [isButtonShown, setIsButtonShown] = useState(true);
    const [playableArray, setPlayableArray] = useState(
        vocabSounds.map(s => s.playable)
    );
    const [musicPlayable, setMusicPlayable] = useState(false);
    const [seasonNames, setSeasonNames] = useState<string[]>([]);
    const [isOpeningVideoShown, setOpeningVideoShown] = useState(false);

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
                    vocabSound.audio.play();
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
                setSeasonNames(["none", ...seasons.map(s => s.name)]);
            }
        })();
    }, [checkUnmounted]);

    const playableCount = playableArray.filter(p => p).length;
    const totalCount = vocabSounds.filter(s => s).length;

    return (
        <>
            <Video
                src={`${staticFolderPath}/video/opening-small-sound.mp4`}
                afterVideo={() => changePage(Page.title)}
                shown={isOpeningVideoShown}
                style={{ width: "100%" }}
                freezingTimeAfterShowing={2000}
            />

            {isButtonShown ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <Link
                            to={`/${
                                isMerged ? "vocabularyMerge" : "vocabularyEdit"
                            }/${genreName}`}
                        >
                            <button>{"<< back"}</button>
                        </Link>
                        <Link to="/">
                            <button>Home</button>
                        </Link>
                    </div>
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
                                        setOpeningVideoShown(true);
                                        setTimeout(startRecording, 2000);
                                    }, 1000);
                                    if (!checkUnmounted()) {
                                        setIsButtonShown(false);
                                    }
                                }}
                            >
                                Video Start
                            </button>
                        )}

                    <div style={{ display: "flex" }}>
                        <div
                            style={{ border: "solid", margin: 20, padding: 20 }}
                        >
                            <input
                                type="checkbox"
                                checked={isOneSeason}
                                style={{ marginRight: 10 }}
                                onChange={() => {
                                    setIsOneSeason(!isOneSeason);
                                    if (isOneSeason) {
                                        const vocabSeasons = vocabList.reduce<
                                            string[]
                                        >((acc, val) => {
                                            const seasons = [...acc];
                                            seasons[val.vocabId] = "none";
                                            return seasons;
                                        }, []);
                                        setVocabSeasons(vocabSeasons);
                                    }
                                }}
                            />
                            {"????????????????????????Season?????????"}
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
                                                        value={
                                                            vocabSeasons[
                                                                v.vocabId
                                                            ]
                                                        }
                                                        onChange={ev => {
                                                            setVocabSeason(
                                                                v.vocabId,
                                                                ev.target.value
                                                            );
                                                        }}
                                                    >
                                                        {seasonNames.map(s => (
                                                            <option key={s}>
                                                                {s}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <div
                                style={{
                                    border: "solid",
                                    margin: 20,
                                    padding: 10,
                                }}
                            >
                                <p>??????????????????</p>
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
                                {"????????????????????????"}
                            </button>
                        </div>
                    </div>
                    <FallingImageEdit />
                    <PreparedImgs />
                </div>
            ) : null}
        </>
    );
}

const { standing_ninja, pochi, ninja_girl } = imgSrc.element;

const imgs = [standing_ninja, pochi, ninja_girl];

function PreparedImgs() {
    return (
        <div style={{ position: "absolute", left: 30 }}>
            {imgs.map((url, i) => {
                const key = `img${i}`;
                return (
                    <img src={url} alt={key} key={key} style={{ width: 30 }} />
                );
            })}
        </div>
    );
}
