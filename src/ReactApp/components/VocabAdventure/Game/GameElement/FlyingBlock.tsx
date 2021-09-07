import * as React from "react";
import { useMemo } from "react";
import { ElementImgName } from "../../../../common/imgSrc";
import { Direction } from "../../../../types/Direction";
import { gameState } from "../GameState";
import { GameElement, GameElementProps, getElementStyle } from "./BaseClass";
import { Ninja } from "./Ninja";

interface Props
    extends GameElementProps,
        Pick<FlyingBlock, "directionToFly" | "speed"> {
    imgInfo: {
        imgName: ElementImgName;
        zIndex?: number;
    };
}

export class FlyingBlock extends GameElement {
    directionToFly: Omit<Direction, "bottom">;
    speed?: number;
    isFlying = false;

    constructor({ directionToFly: direction, ...rest }: Props) {
        super(rest);
        this.directionToFly = direction;
    }

    onEachTime = () => {
        const { ninja, UL } = gameState;

        if (this.checkTouched(ninja)) {
            const ninjaDirection = this.getTargetDirection(ninja);

            switch (ninjaDirection) {
                case Direction.top: {
                    this.imgInfo.willAnimate = true;
                    setTimeout(() => {
                        this.isFlying = true;
                    }, 500);

                    if (this.isFlying) {
                        this.updatePosition(ninja, UL);
                    }

                    ninja.y = this.y - ninja.width;
                    ninja.speedY = 0;
                    break;
                }
                case Direction.bottom: {
                    ninja.y = this.y + this.width;
                    ninja.speedY = 0;
                    break;
                }
                case Direction.left: {
                    ninja.x = this.x - ninja.width;
                    break;
                }
                case Direction.right: {
                    ninja.x = this.x + this.width;
                    break;
                }
            }
        }
    };

    updatePosition = (ninja: Ninja, UL: number) => {
        const speed = (this.speed || 0.5) * UL;

        switch (this.directionToFly) {
            case Direction.top: {
                this.y -= speed;
                return;
            }
            case Direction.right: {
                this.x += speed;
                ninja.x += speed;
                return;
            }
            case Direction.left: {
                this.x -= speed;
                ninja.x -= speed;
                return;
            }
        }
    };

    renderElement = ({}: { playTime: number }) => {
        const { imgInfo } = this;
        const { UL } = gameState;

        if (!imgInfo || !UL) {
            return null;
        }

        const styles = useMemo(() => {
            const fire = { x: this.x, y: this.y, width: this.width };

            switch (this.directionToFly) {
                case Direction.top: {
                    fire.y += this.width;
                    break;
                }
                case Direction.left: {
                    fire.x += this.width;
                    break;
                }
                case Direction.right: {
                    fire.x -= fire.width;
                    break;
                }
            }

            return {
                element: getElementStyle({
                    willAnimate: imgInfo.willAnimate,
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    UL,
                    zIndex: imgInfo.zIndex,
                }),
                fire: getElementStyle({
                    ...fire,
                    willAnimate: imgInfo.willAnimate,
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
