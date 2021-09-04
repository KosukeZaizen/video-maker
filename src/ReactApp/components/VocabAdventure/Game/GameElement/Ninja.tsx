import * as React from "react";
import { useMemo } from "react";
import { imgSrc } from "../../../../common/imgSrc";
import { gameState } from "../GameState";
import { GameElement, getElementStyle } from "./BaseClass";

export class Ninja extends GameElement {
    speedY = 0;
    willAnimate = false;

    constructor(props: { x: number; y: number; width: number }) {
        super({ name: "ninja", ...props });
    }

    onEachTime = () => {
        const {
            UL,
            command: { jump, goLeft, goRight },
        } = gameState;

        if (goLeft && !goRight) {
            this.x -= 3;
        } else if (!goLeft && goRight) {
            this.x += 3;
        }

        if (jump) {
            this.speedY -= 1.5;
            gameState.command.jump = false;
        }

        // gravity
        this.speedY += 0.2;
        this.y += this.speedY * UL;

        this.willAnimate = true;
    };

    renderElement = () => {
        const { UL } = gameState;

        if (!UL) {
            return null;
        }

        const style = useMemo(
            () =>
                getElementStyle({
                    willAnimate: this.willAnimate,
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    UL,
                    zIndex: 100,
                }),
            [UL, this.x, this.y, this.willAnimate]
        );

        return <img src={imgSrc.gameElement.running_ninja} style={style} />;
    };
}
