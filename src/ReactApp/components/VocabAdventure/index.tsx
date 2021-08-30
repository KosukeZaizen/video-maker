import * as React from "react";
import { useEffect, useState } from "react";
import { staticFolderPath } from "../../common/consts";
import { useHideScrollBar } from "../../hooks/useHideScrollBar";
import { Video } from "../shared/Video";
import { Game, GameInfo } from "./Game";

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
            commandTimeline: {
                50: [{ type: "goLeft", start: true }],
                60: [{ type: "jump" }],
                100: [{ type: "goLeft", start: false }],
            },
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
