import * as React from "react";
import { useMemo } from "react";
import { gameState } from "../GameState";
import { GameElement, getElementStyle } from "./BaseClass";

export class Block extends GameElement {
    constructor(
        name: string,
        x: number,
        y: number,
        width: number,
        private imgSrc?: string,
        private willAnimate?: boolean
    ) {
        super(name, x, y, width);
    }

    onEachTime = () => {
        const { ninja } = gameState;
        if (this.checkTouched(ninja)) {
            const direction = this.getTargetDirection(ninja);
            if (direction === "top") {
                ninja.y = this.y - ninja.width;
            }
        }
    };

    renderElement = () => {
        if (!this.imgSrc) {
            return null;
        }

        const { UL } = gameState;

        const style = useMemo(
            () =>
                getElementStyle(
                    this.willAnimate || false,
                    this.x,
                    this.y,
                    this.width,
                    UL
                ),
            [UL]
        );

        return <img src={this.imgSrc} style={style} />;
    };
}
