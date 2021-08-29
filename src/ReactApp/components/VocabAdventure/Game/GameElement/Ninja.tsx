import * as React from "react";
import { useMemo } from "react";
import { GameElement } from ".";
import { staticFolderPath } from "../../../../common/consts";
import { gameState } from "../GameState";

const imgPath = `${staticFolderPath}/img/running_ninja.png`;

export class Ninja extends GameElement {
    private speedY = 0;

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
                ({
                    willChange: "left, top",
                    transitionProperty: "left, top",
                    transitionDuration: `${timeStep}ms`,
                    transitionTimingFunction: "linear",
                    position: "absolute",
                    left: this.x * UL,
                    top: this.y * UL,
                    width: this.width * UL,
                } as const),
            [UL, this.x, this.y]
        );

        return <img src={imgPath} style={style} />;
    };
}
