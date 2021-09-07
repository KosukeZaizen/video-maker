import * as React from "react";
import { useMemo } from "react";
import { ElementImgName, imgSrc } from "../../../../../common/imgSrc";
import { Direction } from "../../../../../types/Direction";
import { Flip } from "../../../../../types/Flip";
import { gameState } from "../../GameState";

export interface GameElementProps
    extends Pick<GameElement, "name" | "x" | "y" | "width"> {
    imgInfo?: {
        imgName: ElementImgName;
        willAnimate?: boolean;
        zIndex?: number;
        flip?: Flip;
    };
}
export abstract class GameElement {
    name: string;
    x: number;
    y: number;
    width: number;
    imgInfo: {
        imgSrc: string;
        willAnimate: boolean;
        zIndex: number;
        flip: Flip;
    };

    constructor({ name, x, y, width, imgInfo }: GameElementProps) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        if (imgInfo) {
            const { imgName, zIndex, willAnimate, flip } = imgInfo;
            this.imgInfo = {
                imgSrc: imgName && imgSrc.gameElement[imgName],
                zIndex: zIndex || 0,
                willAnimate: willAnimate || false,
                flip: flip || Flip.none,
            };
        } else {
            this.imgInfo = {
                imgSrc: "",
                willAnimate: false,
                zIndex: 0,
                flip: Flip.none,
            };
        }
    }

    abstract onEachTime: () => void;

    renderElement = ({}: { playTime: number }): JSX.Element | null => {
        const { imgInfo } = this;

        const { UL } = gameState;

        if (!UL) {
            return null;
        }

        const style = useMemo(
            () =>
                getElementStyle({
                    willAnimate: imgInfo.willAnimate || false,
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    UL,
                    zIndex: imgInfo.zIndex,
                    flip: imgInfo.flip,
                }),
            [UL, this.x, this.y, this.width, imgInfo.flip, imgInfo.willAnimate]
        );

        return <img src={imgInfo.imgSrc} style={style} />;
    };

    checkTouched(target: GameElement): boolean {
        //かすっていたらtrue
        if (target.x + target.width > this.x) {
            if (target.x < this.x + this.width) {
                if (target.y + target.width > this.y) {
                    if (target.y < this.y + this.width) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    protected getTargetDirection(target: GameElement): Direction {
        //Itemから見た忍者の位置を返す関数

        //中心座標計算
        const ninja_center = [
            target.x + target.width / 2,
            target.y + target.width / 2,
        ];
        const item_center = [this.x + this.width / 2, this.y + this.width / 2];

        //2オブジェクトの中心間の差を計算
        const dX = item_center[0] - ninja_center[0];
        const dY = item_center[1] - ninja_center[1];

        //0除算除外
        if (dX === 0) {
            //2つの物体のx座標が一致
            return dY > 0 ? Direction.top : Direction.bottom;
        }

        //傾き
        const a = dY / dX;

        //傾きから相対位置判定
        if (1 > a && a > -1) {
            return dX > 0 ? Direction.left : Direction.right;
        } else {
            return dY > 0 ? Direction.top : Direction.bottom;
        }
    }
}

export function getElementStyle({
    willAnimate,
    x,
    y,
    width,
    UL,
    zIndex,
    flip,
}: {
    willAnimate?: boolean;
    x: number;
    y: number;
    width: number;
    UL: number;
    zIndex?: number;
    flip?: Flip;
}) {
    if (willAnimate) {
        return {
            willChange: "left, top",
            transitionProperty: "left, top",
            transitionDuration: `${gameState.timeStep}ms`,
            transitionTimingFunction: "linear",
            position: "absolute",
            left: x * UL,
            top: y * UL,
            width: width * UL,
            zIndex,
            transform: getTransform(flip),
        } as const;
    }

    return {
        position: "absolute",
        left: x * UL,
        top: y * UL,
        width: width * UL,
        zIndex,
        transform: getTransform(flip),
    } as const;
}

function getTransform(flip?: Flip) {
    switch (flip) {
        case Flip.flippedHorizontally: {
            return "translate(-1,1)";
        }
        case Flip.upsideDown: {
            return "translate(1,-1)";
        }
        case Flip.none:
        default: {
            return undefined;
        }
    }
}
