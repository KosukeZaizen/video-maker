import * as React from "react";
import { useState } from "react";
import { staticFolderPath } from "../../common/consts";
import { Video } from "../shared/Video";
import { Game } from "./Game";

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

function VocabAdventure({ match: { params } }: Props) {
    const [isPlaying, setPlaying] = useState(false);
    const videoKey = "test";

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
                        videoKey={videoKey}
                    />
                </div>
            )}
        </>
    );
}

type Scene = "opening" | "game" | "quiz" | "ending";

function VideoContents({
    setPlaying,
    videoKey,
}: {
    setPlaying: (isPlaying: boolean) => void;
    videoKey: string;
}) {
    const [scene, setScene] = useState<Scene>("game");

    switch (scene) {
        case "opening": {
            return (
                <OpeningScene
                    onended={() => {
                        setScene("game");
                    }}
                    videoKey={videoKey}
                />
            );
        }
        case "game": {
            return (
                <GameScene
                    onended={() => {
                        setScene("quiz");
                    }}
                    videoKey={videoKey}
                />
            );
        }
        case "quiz": {
            return <div>hello</div>;
        }
        case "ending": {
            return <div>hello</div>;
        }
        default: {
            return null;
        }
    }
}

interface SceneProps {
    onended: () => void;
    videoKey: string;
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

function GameScene({ onended, videoKey }: SceneProps) {
    return <Game command={{}} videoKey={videoKey} />;
}

export default VocabAdventure;
