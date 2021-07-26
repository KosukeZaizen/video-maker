import * as React from "react";
import { useEffect, useState } from "react";
import { appsPublicImg } from "../../../../common/consts";

const timeStep = 1000; //ms

const badNinja = appsPublicImg + "ninja_bad.png";
const rock = appsPublicImg + "rockRight.png";
const fire = appsPublicImg + "fireRight.png";
const flyingNinja = appsPublicImg + "flying-ninja.png";
const runningNinja = appsPublicImg + "ninja_hashiru.png";

interface StateToAnimate {
    shown: boolean;
    ninjaX: number;
    ninjaY: number;
    badNinjaX: number;
    turn: boolean;
    flyingNinjaPos: [number, number];
    flyingNinjaSpeed: [number, number];
    time: number;
    flyingNinjaDisplay: string;
}

const initialAnimationState: StateToAnimate = {
    shown: true,
    ninjaX: 3000,
    ninjaY: 0,
    badNinjaX: 3000,
    turn: false,
    flyingNinjaPos: [2500, 300],
    flyingNinjaSpeed: [0, 0],
    flyingNinjaDisplay: "block",
    time: 0,
};

const baseStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 1000000000,
};

const smoothTransform = {
    willChange: "transform",
    transitionProperty: "transform",
    transitionDuration: `${timeStep}ms`,
    transitionTimingFunction: "linear",
};

export function FooterAnimation() {
    const [animationState, setAnimationState] = useState(initialAnimationState);

    useEffect(() => {
        setTimeout(() => {
            let {
                ninjaX,
                ninjaY,
                badNinjaX,
                turn,
                flyingNinjaPos,
                flyingNinjaSpeed,
                flyingNinjaDisplay,
                time,
                ...rest
            } = animationState;

            if (time > 1000 / timeStep && time < 11200 / timeStep) {
                ninjaX -= 0.5 * timeStep;
                badNinjaX = ninjaX + 900;
            }

            if (time === Math.floor(11200 / timeStep)) {
                turn = true;
                ninjaY = 115;
            }

            if (time > 11200 / timeStep && time < 22000 / timeStep) {
                ninjaX += 0.5 * timeStep;
                badNinjaX = ninjaX + 600;
            }

            if (time > 22000 / timeStep && flyingNinjaPos[0] > -200) {
                if (flyingNinjaPos[0] > 2000) {
                    flyingNinjaDisplay = "block";
                }
                flyingNinjaSpeed[1] +=
                    ((Math.random() - 0.499) * timeStep) / 30;

                flyingNinjaPos[0] -= 0.3 * timeStep;
                flyingNinjaPos[1] += flyingNinjaSpeed[1];
            }

            if (time % Math.floor(60000 / timeStep) === 0) {
                flyingNinjaDisplay = "none";
                flyingNinjaPos = [2500, 300];
                flyingNinjaSpeed = [0, 0];
            }

            setAnimationState({
                ninjaX,
                ninjaY,
                badNinjaX,
                turn,
                flyingNinjaPos,
                flyingNinjaSpeed,
                flyingNinjaDisplay,
                time: time + 1,
                ...rest,
            });
        }, timeStep);
    }, [animationState]);

    if (!animationState.shown) {
        return null;
    }

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const squareLength = (innerWidth + innerHeight) / 2;

    const U = squareLength / 1000; // unit length

    const ninjaLength = 100;

    return (
        <>
            <img
                src={runningNinja}
                alt="running ninja"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn
                        ? `scale(-1, 1) ${getTranslate(
                              -animationState.ninjaX * U,
                              -animationState.ninjaY * U
                          )}`
                        : getTranslate(
                              animationState.ninjaX * U,
                              -animationState.ninjaY * U
                          ),
                    ...smoothTransform,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn
                        ? getTranslate(animationState.badNinjaX * U, 0)
                        : `scale(-1, 1) ${getTranslate(
                              -animationState.badNinjaX * U,
                              0
                          )}`,
                    ...smoothTransform,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn
                        ? getTranslate((animationState.badNinjaX - 100) * U, 0)
                        : `scale(-1, 1) ${getTranslate(
                              -(animationState.badNinjaX - 100) * U,
                              0
                          )}`,
                    ...smoothTransform,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U,
                    transform: animationState.turn
                        ? getTranslate((animationState.badNinjaX - 200) * U, 0)
                        : `scale(-1, 1) ${getTranslate(
                              -(animationState.badNinjaX - 200) * U,
                              0
                          )}`,
                    ...smoothTransform,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn
                        ? getTranslate((animationState.badNinjaX - 300) * U, 0)
                        : `scale(-1, 1) ${getTranslate(
                              -(animationState.badNinjaX - 300) * U,
                              0
                          )}`,
                    ...smoothTransform,
                }}
            />
            <img
                src={badNinja}
                alt="bad ninja"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U * 1.1,
                    transform: animationState.turn
                        ? getTranslate((animationState.badNinjaX - 400) * U, 0)
                        : `scale(-1, 1) ${getTranslate(
                              -(animationState.badNinjaX - 400) * U,
                              0
                          )}`,
                    ...smoothTransform,
                }}
            />
            <img
                src={rock}
                alt="rock"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U * 1.3,
                    zIndex: 1000000001,
                    transform: getTranslate((animationState.ninjaX - 5) * U, 0),
                    ...smoothTransform,
                    display:
                        animationState.time > 10000 / timeStep
                            ? "inline"
                            : "none",
                }}
            />
            <img
                src={fire}
                alt="fire"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U * 1.3,
                    transform: getTranslate(
                        (animationState.ninjaX - ninjaLength) * U,
                        0
                    ),
                    ...smoothTransform,
                    display:
                        animationState.time > 10000 / timeStep
                            ? "inline"
                            : "none",
                }}
            />
            <img
                src={flyingNinja}
                alt="flying ninja"
                style={{
                    ...baseStyle,
                    backfaceVisibility: "hidden",
                    left: 0,
                    bottom: 0,
                    width: ninjaLength * U * 1.5,
                    display: animationState.flyingNinjaDisplay,
                    transform: getTranslate(
                        animationState.flyingNinjaPos[0] * U,
                        -animationState.flyingNinjaPos[1] * U
                    ),
                    ...smoothTransform,
                }}
            />
        </>
    );
}

function getTranslate(x: number, y: number) {
    return `translate3d(${Math.floor(x)}px,${Math.floor(y)}px,0px)`;
}
