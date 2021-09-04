import * as React from "react";
import { useMemo } from "react";
import { ElementImgName } from "../../../../common/imgSrc";
import { gameState } from "../GameState";
import { GameElement, GameElementProps, getElementStyle } from "./BaseClass";

interface Props extends GameElementProps, Pick<Floor, "willAnimate"> {
    imgName?: ElementImgName;
}

export class Floor extends GameElement {
    imgSrc?: string;
    willAnimate?: boolean;

    constructor(props: Props) {
        super(props);
    }

    onEachTime = () => {
        const { ninja } = gameState;
        if (this.checkTouched(ninja)) {
            const direction = this.getTargetDirection(ninja);
            if (direction === "top") {
                ninja.y = this.y - ninja.width;
                ninja.speedY = 0;
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
                getElementStyle({
                    willAnimate: this.willAnimate || false,
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    UL,
                }),
            [UL]
        );

        return <img src={this.imgSrc} style={style} />;
    };
}
