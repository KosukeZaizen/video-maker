import * as React from "react";
import { useMemo } from "react";
import { BackgroundImgName, imgSrc } from "../../../../common/imgSrc";
import { gameState } from "../GameState";
import { GameElement, GameElementProps, getElementStyle } from "./BaseClass";

interface Props extends GameElementProps {
    imgName: BackgroundImgName;
}
export class BackgroundImg extends GameElement {
    imgSrc: string;

    constructor({ name, x, y, width, imgName }: Props) {
        super(name, x, y, width);
        this.imgSrc = imgName && imgSrc.gameElement[imgName];
    }

    onEachTime = () => {
        const { ninja } = gameState;

        if (this.checkTouched(ninja)) {
            const direction = this.getTargetDirection(ninja);

            switch (direction) {
                case "top": {
                    ninja.y = this.y - ninja.width;
                    ninja.speedY = 0;
                    break;
                }
                case "bottom": {
                    ninja.y = this.y + this.width;
                    ninja.speedY = 0;
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
            () => getElementStyle(false, this.x, this.y, this.width, UL),
            [UL]
        );

        return <img src={this.imgSrc} style={style} />;
    };
}
