import * as React from "react";
import { useMemo } from "react";
import { ElementImgName, imgSrc } from "../../../../common/imgSrc";
import { gameState } from "../GameState";
import { GameElement, GameElementProps, getElementStyle } from "./BaseClass";

interface Props extends GameElementProps, Pick<Floor, "willAnimate"> {
    imgName?: ElementImgName;
}

export class Floor extends GameElement {
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
