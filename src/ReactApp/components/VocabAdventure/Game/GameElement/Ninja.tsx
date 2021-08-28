import * as React from "react";
import { GameElement } from ".";
import { staticFolderPath } from "../../../../common/consts";
import { gameState } from "../GameState";

export class Ninja extends GameElement {
    constructor(x: number, y: number, width: number) {
        super("ninja", x, y, width);
    }

    onEachTime = () => {
        const command = gameState;
    };

    renderElement = ({ UL }: { UL: number }) => {
        return (
            <img
                src={`${staticFolderPath}/img/running_ninja.png`}
                style={{
                    position: "absolute",
                    left: this.x * UL,
                    top: this.y * UL,
                    width: this.width * UL,
                }}
            />
        );
    };
}
