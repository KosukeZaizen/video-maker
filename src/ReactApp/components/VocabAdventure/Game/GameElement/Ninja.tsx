import * as React from "react";
import { GameElement } from ".";
import { staticFolderPath } from "../../../../common/consts";
import { gameState } from "../GameState";

export class Ninja extends GameElement {
    constructor(x: number, y: number, width: number) {
        super("ninja", x, y, width);
    }

    onEachTime = () => {
        const { UL } = gameState;
        const { jump, goLeft, goRight } = gameState.command;

        this.y += 1 * UL;
    };

    renderElement = () => {
        const { UL, timeStep } = gameState;
        return (
            <img
                src={`${staticFolderPath}/img/running_ninja.png`}
                style={{
                    willChange: "left, top",
                    transitionProperty: "left top",
                    transitionDuration: `${timeStep}ms`,
                    position: "absolute",
                    left: this.x * UL,
                    top: this.y * UL,
                    width: this.width * UL,
                }}
            />
        );
    };
}
