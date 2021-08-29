import * as React from "react";
import { useMemo } from "react";
import { ElementImgName, imgSrc } from "../../../../common/imgSrc";
import { gameState } from "../GameState";
import { GameElement, GameElementProps, getElementStyle } from "./BaseClass";

interface Props extends GameElementProps, Pick<Block, "willAnimate"> {
    imgName?: ElementImgName;
}
export class Block extends GameElement {
    imgSrc?: string;
    willAnimate?: boolean;

    constructor({ name, x, y, width, imgName, willAnimate }: Props) {
        super(name, x, y, width);
        this.imgSrc = imgName && imgSrc.gameElement[imgName];
        this.willAnimate = willAnimate;
    }

    onEachTime = () => {
        const { ninja } = gameState;

        if (this.checkTouched(ninja)) {
            const direction = this.getTargetDirection(ninja);

            switch (direction) {
                case "top": {
                    ninja.y = this.y - ninja.width;
                    break;
                }
                case "bottom": {
                    ninja.y = this.y + this.width;
                    break;
                }
                case "left": {
                    ninja.x = this.x - ninja.width;
                    break;
                }
                case "right": {
                    ninja.x = this.x + this.width;
                    break;
                }
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
