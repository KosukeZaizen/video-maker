import * as React from "react";
import { useMemo } from "react";
import { BackgroundImgName, imgSrc } from "../../../../common/imgSrc";
import { gameState } from "../GameState";
import { GameElement, getElementStyle } from "./BaseClass";

interface Props {
    imgName: BackgroundImgName;
}
export class BackgroundImg extends GameElement {
    imgSrc: string;

    constructor({ imgName }: Props) {
        super({ name: "bgImg", x: 0, y: 0, width: 160 });
        this.imgSrc = imgName && imgSrc.background[imgName];
    }

    onEachTime = () => {};

    renderElement = () => {
        const { UL } = gameState;

        const style = useMemo(
            () =>
                ({
                    ...getElementStyle({
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        UL,
                    }),
                    objectFit: "cover",
                    zIndex: -1,
                } as const),
            [UL]
        );

        return <img src={this.imgSrc} style={style} />;
    };
}
