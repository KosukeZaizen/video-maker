import { Flip } from "../../../../types/Flip";
import { gameState } from "../GameState";
import { GameElement } from "./BaseClass";

export class Ninja extends GameElement {
    speedY = 0;

    constructor(props: { x: number; y: number; width: number }) {
        super({
            name: "ninja",
            ...props,
            imgInfo: {
                imgName: "running_ninja",
                zIndex: 100,
                willAnimate: false,
                flip: Flip.none,
            },
        });
    }

    onEachTime = () => {
        const {
            UL,
            command: { jump, goLeft, goRight },
        } = gameState;

        if (goLeft && !goRight) {
            this.x -= 3.5;
        } else if (!goLeft && goRight) {
            this.x += 3.5;
        }

        if (jump) {
            this.speedY -= 1.5;
            gameState.command.jump = false;
        }

        // gravity
        this.speedY += 0.2;
        this.y += this.speedY * UL;

        if (this.imgInfo) {
            this.imgInfo.willAnimate = true;
        }
    };
}
