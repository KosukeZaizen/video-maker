import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";
import { staticFolderPath } from "../../../common/consts";
import { sleepAsync } from "../../../common/functions";
import { imgSrc } from "../../../common/imgSrc";
import { useVideoRecorder } from "../../../hooks/useVideoRecorder";
import { Video } from "../../shared/Video";

const { scroll_center, scroll_left } = imgSrc.element;

export default function ChapterTitle() {
    const [started, setStarted] = useState(false);
    const { startRecording, stopRecording } = useVideoRecorder({
        fileName: "chapter_title",
    });

    if (started) {
        return <TitleAnimation />;
    }

    return (
        <div style={fullScreenStyle}>
            <button
                onClick={() => {
                    setStarted(true);
                    (async () => {
                        await sleepAsync(1000);
                        startRecording();

                        await sleepAsync(12000);
                        stopRecording();
                    })();
                }}
            >
                start
            </button>
        </div>
    );
}

const backGroundVideo = {
    blackSakura: "black_sakura",
    kabuki: "kabuki",
};

function TitleAnimation() {
    return (
        <>
            <div style={{ ...fullScreenStyle, cursor: "none", zIndex: 100 }}>
                <Scroll />
            </div>
            <div style={{ ...fullScreenStyle, cursor: "none", zIndex: 10 }}>
                <Video
                    src={`${staticFolderPath}/video/${backGroundVideo.blackSakura}.mp4`}
                    afterVideo={() => {}}
                    shown={true}
                    style={{
                        width: "100%",
                    }}
                    freezingTimeAfterShowing={100}
                />
            </div>
        </>
    );
}

const height = 600;

const closedScrollWidth = 14;
const openScrollWidth = 900;

const hiddenMarginTop = 682;
const closedMarginTop = -10;

type ScrollState = "hidden" | "closed" | "open";

const transition = "500ms";

function Scroll() {
    const [scrollState, setScrollState] = useState<ScrollState>("hidden");

    const scrollWidth =
        scrollState === "open" ? openScrollWidth : closedScrollWidth;

    const marginTop =
        scrollState === "hidden" ? hiddenMarginTop : closedMarginTop;

    useEffect(() => {
        (async () => {
            await sleepAsync(5000);
            setScrollState("closed");

            await sleepAsync(500);
            setScrollState("open");

            await sleepAsync(3500);
            setScrollState("closed");

            await sleepAsync(500);
            setScrollState("hidden");
        })();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                marginTop,
                transition,
                zIndex: 1000,
            }}
        >
            <div style={{ display: "flex", height }}>
                <div style={{ height: "100%" }}>
                    <img
                        src={scroll_left}
                        style={{
                            height: "100%",
                            position: "relative",
                            left: "5%",
                        }}
                    />
                </div>
                <div
                    style={{
                        height: 543,
                        marginTop: 60,
                        maxWidth: scrollWidth,
                        overflow: "hidden",
                        transition,
                    }}
                >
                    <img src={scroll_center} style={{ height: "100%" }} />
                </div>
                <div style={{ height: "100%" }}>
                    <img
                        src={scroll_left}
                        style={{
                            height: "100%",
                            transform: "scale(-1,1)",
                            position: "relative",
                            right: "5%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
const fullScreenStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
};

