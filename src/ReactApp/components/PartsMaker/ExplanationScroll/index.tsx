import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sleepAsync } from "../../../common/functions";
import { imgSrc } from "../../../common/imgSrc";

const { scroll_center, scroll_left } = imgSrc.element;

export default function ExplanationScroll() {
    const [started, setStarted] = useState(true);

    if (started) {
        return <ScrollAnimation />;
    }

    return (
        <div style={fullScreenStyle}>
            <Link to="/">home</Link>
            <hr />
            <button
                onClick={() => {
                    setStarted(true);
                }}
            >
                start name plate
            </button>
        </div>
    );
}

function ScrollAnimation() {
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

const height = 420;

const closedScrollWidth = 14;
const openScrollWidth = 1160;

const hiddenMarginTop = 682;
const closedMarginTop = 173;

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
                        height: (height * 543) / 600,
                        marginTop: height / 10,
                        maxWidth: scrollWidth,
                        overflow: "hidden",
                        transition,
                        position: "relative",
                        width: scrollWidth,
                    }}
                >
                    <img
                        src={scroll_center}
                        style={{
                            height: "100%",
                            width: openScrollWidth,
                        }}
                    />
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

