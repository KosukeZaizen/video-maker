import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";
import { sleepAsync } from "../../../common/functions";
import { imgSrc } from "../../../common/imgSrc";

const { scroll_center, scroll_left } = imgSrc.element;

export default function ChapterTitle() {
    const [started, setStarted] = useState(true);

    if (started) {
        return <TitleAnimation />;
    }

    return (
        <div style={fullScreenStyle}>
            <button
                onClick={() => {
                    setStarted(true);
                }}
            >
                start
            </button>
        </div>
    );
}

function TitleAnimation() {
    return (
        <div style={{ ...fullScreenStyle, cursor: "none" }}>
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

function Scroll() {
    const [scrollState, setScrollState] = useState<ScrollState>("hidden");

    const scrollWidth =
        scrollState === "open" ? openScrollWidth : closedScrollWidth;

    useEffect(() => {
        (async () => {
            await sleepAsync(500);
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
                marginTop:
                    scrollState === "hidden"
                        ? hiddenMarginTop
                        : closedMarginTop,
                transition: "500ms",
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
                        transition: "500ms",
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

