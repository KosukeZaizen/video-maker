import { css, StyleSheet } from "aphrodite";
import * as React from "react";
import { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import { appsPublicImg } from "../../../common/consts";

export default function RotatingShuriken() {
    const [started, setStarted] = useState(true);

    if (started) {
        return <ShurikenAnimation />;
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

function ShurikenAnimation() {
    return (
        <div
            style={{
                ...fullScreenStyle,
                cursor: "none",
                zIndex: 100,
                backgroundColor: "yellow",
            }}
        >
            <Scroll />
        </div>
    );
}

function Scroll() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                zIndex: 1000,
            }}
        >
            <ShurikenProgress />
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

const shuriken = appsPublicImg + "shuriken.png";

interface Props {
    size?: string;
    style?: React.CSSProperties;
}
export function ShurikenProgress({ size, style }: Props) {
    return (
        <div style={style}>
            <img
                src={shuriken}
                alt="shuriken"
                className={css(styles.ShurikenProgress)}
                style={{ width: size, height: size }}
            />
        </div>
    );
}

const rotateKeyframes = {
    "0%": {
        transform: "rotate(0deg)",
    },
    "90%": {
        transform: "rotate(360deg)",
    },
    "100%": {
        transform: "rotate(360deg)",
    },
};

const styles = StyleSheet.create({
    ShurikenProgress: {
        animationName: [rotateKeyframes],
        animationDuration: "1s",
        animationIterationCount: "infinite",
    },
});

