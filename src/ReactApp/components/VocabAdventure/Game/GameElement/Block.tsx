import { gameState } from "../GameState";
import { GameElement, GameElementProps } from "./BaseClass";

interface Props extends GameElementProps {}
export class Block extends GameElement {
    constructor(props: Props) {
        super(props);
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
}
