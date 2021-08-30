import * as React from "react";
import { useMemo } from "react";
import { imgSrc } from "../../../../common/imgSrc";
import { gameState } from "../GameState";
import { GameElement, getElementStyle } from "./BaseClass";

export class Ninja extends GameElement {
    private speedY = 0;
    private willAnimate = true;

    constructor({ x, y, width }: { x: number; y: number; width: number }) {
        super("ninja", x, y, width);
    }

    onEachTime = () => {
        const { UL } = gameState;
        const { jump, goLeft, goRight } = gameState.command;

        if (goLeft && !goRight) {
            this.x -= 3;
        } else if (!goLeft && goRight) {
            this.x += 3;
        }

        if (jump) {
            this.speedY -= 5;
        }

        // gravity
        this.speedY += 0.2;
        this.y += this.speedY * UL;
    };

    renderElement = () => {
        const { UL } = gameState;

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

        return <img src={imgSrc.gameElement.running_ninja} style={style} />;
    };
}
