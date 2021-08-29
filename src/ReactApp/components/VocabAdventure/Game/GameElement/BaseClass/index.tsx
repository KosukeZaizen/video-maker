import { Direction } from "../../../../../types/Direction";
import { gameState } from "../../GameState";

export type GameElementProps = Pick<GameElement, "name" | "x" | "y" | "width">;
export abstract class GameElement {
    constructor(
        public name: string,
        public x: number,
        public y: number,
        public width: number
    ) {}

    abstract onEachTime: () => void;

    abstract renderElement: ({
        playtime,
    }: {
        playtime: number;
    }) => JSX.Element | null;

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

export function getAnimationStyle(
    x: number,
    y: number,
    width: number,
    UL: number
) {}

export function getElementStyle(
    willAnimate: boolean,
    x: number,
    y: number,
    width: number,
    UL: number
) {
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
        } as const;
    }

    return {
        position: "absolute",
        left: x * UL,
        top: y * UL,
        width: width * UL,
    } as const;
}
