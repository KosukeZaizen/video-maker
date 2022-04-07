import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sleepAsync } from "../../../common/functions";
import { imgSrc } from "../../../common/imgSrc";

const { scroll_center, scroll_left } = imgSrc.element;

export default function NamePlate() {
    const [started, setStarted] = useState(true);
    // const { startRecording, stopRecording } = useVideoRecorder({
    //     fileName: "name_plate",
    // });

    if (started) {
        return <TitleAnimation />;
    }

    return (
        <div style={fullScreenStyle}>
            <Link to="/">home</Link>
            <hr />
            <button
                onClick={() => {
                    setStarted(true);
                    // (async () => {
                    //     await sleepAsync(1000);
                    //     startRecording();

                    //     await sleepAsync(12000);
                    //     stopRecording();
                    // })();
                }}
            >
                start name plate
            </button>
        </div>
    );
}

function TitleAnimation() {
    return (
        <div
            style={{
                ...fullScreenStyle,
                cursor: "none",
                zIndex: 100,
                backgroundColor: "red",
            }}
        >
            <Scroll />
        </div>
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

            await sleepAsync(6500);
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
                            zIndex: 1000,
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
                        position: "relative",
                    }}
                >
                    <img src={scroll_center} style={{ height: "100%" }} />
                    <div
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 250,
                            zIndex: 10,
                            whiteSpace: "nowrap",
                            fontFamily: `"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif`,
                            fontWeight: "bold",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 200,
                                margin: 0,
                                padding: 0,
                            }}
                        >
                            航介
                        </div>
                        <div
                            style={{
                                fontSize: 100,
                                margin: "0 0 0 10px",
                                padding: 0,
                                position: "relative",
                                bottom: 60,
                            }}
                        >
                            {"Kō suke"}
                        </div>
                    </div>
                </div>
                <div style={{ height: "100%" }}>
                    <img
                        src={scroll_left}
                        style={{
                            height: "100%",
                            transform: "scale(-1,1)",
                            position: "relative",
                            right: "5%",
                            zIndex: 1000,
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

