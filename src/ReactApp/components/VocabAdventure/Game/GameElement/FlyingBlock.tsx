import * as React from "react";
import { useMemo } from "react";
import { Direction } from "../../../../types/Direction";
import { gameState } from "../GameState";
import { GameElement, GameElementProps, getElementStyle } from "./BaseClass";

interface Props extends GameElementProps, Pick<FlyingBlock, "directionToFly"> {}

export class FlyingBlock extends GameElement {
    isFlying = false;
    directionToFly: Direction;

    constructor({ directionToFly: direction, ...rest }: Props) {
        super(rest);
        this.directionToFly = direction;
    }

    onEachTime = () => {
        const { ninja } = gameState;

        if (this.isFlying) {
        }

        if (this.checkTouched(ninja)) {
            const ninjaDirection = this.getTargetDirection(ninja);

            switch (ninjaDirection) {
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

    renderElement = ({}: { playTime: number }) => {
        const { imgInfo } = this;

        if (!imgInfo) {
            return null;
        }

        const { UL } = gameState;

        const styles = useMemo(() => {
            const fire = { x: this.x, y: this.y, width: this.width };

            switch (this.directionToFly) {
                case "top": {
                    fire.y += this.width;
                    break;
                }
                case "left": {
                    fire.x += this.width;
                    break;
                }
                case "right": {
                    fire.x -= fire.width;
                    break;
                }
            }

            return {
                element: getElementStyle({
                    willAnimate: true,
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    UL,
                    zIndex: imgInfo.zIndex,
                }),
                fire: getElementStyle({
                    ...fire,
                    willAnimate: true,
                    UL,
                    zIndex: imgInfo.zIndex,
                }),
            };
        }, [UL, this.x, this.y, this.width]);

        return (
            <>
                <img src={imgInfo.imgSrc} style={styles.element} />
            </>
        );
    };
}
