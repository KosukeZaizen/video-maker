import * as React from "react";
import { useMemo } from "react";
import { staticFolderPath } from "../../../../common/consts";
import { gameState } from "../GameState";
import { GameElement, getElementStyle } from "./BaseClass";

const imgPath = `${staticFolderPath}/img/running_ninja.png`;

export class Ninja extends GameElement {
    private speedY = 0;
    private willAnimate = true;

    constructor(x: number, y: number, width: number) {
        super("ninja", x, y, width);
    }

    onEachTime = () => {
        const { UL } = gameState;
        const { jump, goLeft, goRight } = gameState.command;

        this.speedY += 0.02;
        this.y += this.speedY * UL;
    };

    renderElement = () => {
        const { UL, timeStep } = gameState;

        const style = useMemo(
            () =>
                getElementStyle(
                    this.willAnimate,
                    this.x,
                    this.y,
                    this.width,
                    UL
                ),
            [UL, this.x, this.y, this.willAnimate]
        );

        return <img src={imgPath} style={style} />;
    };
}
