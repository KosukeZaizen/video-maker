import * as React from "react";
import { useEffect, useState } from "react";
import { staticFolderPath } from "../../common/consts";
import { useHideScrollBar } from "../../hooks/useHideScrollBar";
import { Video } from "../shared/Video";
import { Game, GameInfo } from "./Game";
import { BackgroundImg } from "./Game/GameElement/BackgroundImg";
import { Block } from "./Game/GameElement/Block";
import { Floor } from "./Game/GameElement/Floor";
import { FlyingBlock } from "./Game/GameElement/FlyingBlock";
import { Img } from "./Game/GameElement/Img";
import { SpeakingCharacter } from "./Game/GameElement/SpeakingCharacter";
import { StageChanger } from "./Game/GameElement/StageChanger";

type VideoState = { isPlaying: boolean; scene: Scene };

const initialVideoState: VideoState = {
    isPlaying: true,
    scene: "game",
};

const styles = {
    pageContentDiv: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
} as const;

type Props = {
    location: { pathname: string };
    match: { params: { [key: string]: string } };
};

export interface VideoInfo {
    gameInfo: GameInfo;
}

function VocabAdventure({ match: { params } }: Props) {
    const [isPlaying, setPlaying] = useState(initialVideoState.isPlaying);
    const videoInfo: VideoInfo = {
        gameInfo: {
            currentStage: 0,
            stages: [
                {
                    currentStageTime: 0,
                    initialPosition: { x: 140, y: 0 },
                    commandTimeline: {
                        20: [{ type: "goLeft", start: true }],
                        40: [{ type: "jump" }],
                    },
                    elements: [
                        new Floor({
                            name: "floor1",
                            x: -120,
                            y: 90,
                            width: 400,
                        }),
                        new Block({
                            name: "rock1",
                            x: 20,
                            y: 70,
                            width: 25,
                            imgInfo: { imgName: "rock" },
                        }),
                        new BackgroundImg({ imgName: "first_street" }),
                        new Img({
                            name: "torii",
                            imgInfo: { imgName: "torii", zIndex: 99 },
                            x: 35,
                            y: 18,
                            width: 120,
                        }),
                        new StageChanger({
                            name: "stageChanger1",
                            x: -30,
                            y: 70,
                            width: 20,
                        }),
                    ],
                },
                {
                    currentStageTime: 0,
                    initialPosition: { x: 160, y: 77 },
                    commandTimeline: {
                        1: [{ type: "goLeft", start: true }],
                        5: [{ type: "goLeft", start: false }],
                        10: [{ type: "goLeft", start: true }],
                        20: [{ type: "goLeft", start: false }],
                        30: [{ type: "goLeft", start: true }],
                        43: [{ type: "jump" }],
                        54: [{ type: "goLeft", start: false }],
                    },
                    elements: [
                        new Floor({
                            name: "floor1",
                            x: -120,
                            y: 90,
                            width: 400,
                        }),
                        new BackgroundImg({ imgName: "pochi_room" }),
                        new SpeakingCharacter({
                            message:
                                "Hello!\nYour mission is learning Japanese vocabulary!\nGood luck!",
                            messageWidth: 100,
                            name: "pochi",
                            x: 100,
                            y: 74.5,
                            width: 12,
                            imgInfo: {
                                imgName: "pochi",
                            },
                        }),
                        new FlyingBlock({
                            name: "butsudan",
                            x: 20,
                            y: 65,
                            width: 25,
                            imgInfo: { imgName: "butsudan" },
                            directionToFly: "top",
                            distanceBetweenFireAndBlock: 0.4,
                        }),
                    ],
                },
            ],
        },
    };

    return (
        <>
            {!isPlaying && (
                <div style={styles.pageContentDiv}>
                    <button onClick={() => setPlaying(true)}>
                        Video Start
                    </button>
                </div>
            )}
            {isPlaying && (
                <div style={styles.pageContentDiv}>
                    <VideoContents
                        setPlaying={setPlaying}
                        videoInfo={videoInfo}
                    />
                </div>
            )}
        </>
    );
}

type Scene = "opening" | "game" | "quiz" | "ending";

function VideoContents({
    setPlaying,
    videoInfo,
}: {
    setPlaying: (isPlaying: boolean) => void;
    videoInfo: VideoInfo;
}) {
    useHideScrollBar();

    const [scene, setScene] = useState<Scene>(initialVideoState.scene);

    switch (scene) {
        case "opening": {
            return (
                <OpeningScene
                    onended={() => {
                        setScene("game");
                    }}
                    videoInfo={videoInfo}
                />
            );
        }
        case "game": {
            return (
                <GameScene
                    onended={() => {
                        setScene("quiz");
                    }}
                    videoInfo={videoInfo}
                />
            );
        }
        case "quiz": {
            return (
                <QuizScene
                    onended={() => {
                        setScene("ending");
                    }}
                    videoInfo={videoInfo}
                />
            );
        }
        case "ending": {
            return (
                <EndingScene
                    onended={() => {
                        setPlaying(false);
                    }}
                    videoInfo={videoInfo}
                />
            );
        }
        default: {
            return null;
        }
    }
}

interface SceneProps {
    onended: () => void;
    videoInfo: VideoInfo;
}

function OpeningScene({ onended }: SceneProps) {
    return (
        <Video
            src={`${staticFolderPath}/video/opening-small-sound.mp4`}
            afterVideo={onended}
            shown={true}
            style={{
                width: "100%",
            }}
            freezingTimeAfterShowing={2000}
        />
    );
}

function GameScene({ onended, videoInfo }: SceneProps) {
    return <Game gameInfo={videoInfo.gameInfo} onended={onended} />;
}

function QuizScene({ onended, videoInfo: videoKey }: SceneProps) {
    useEffect(() => {
        setTimeout(onended, 2000);
    }, []);
    return <div>Quiz</div>;
}

function EndingScene({ onended, videoInfo: videoKey }: SceneProps) {
    useEffect(() => {
        setTimeout(onended, 2000);
    }, []);
    return <div>Ending</div>;
}

export default VocabAdventure;
