import { gameState } from "../GameState";
import { GameElement, GameElementProps } from "./BaseClass";

interface Props extends GameElementProps {}

export class Floor extends GameElement {
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
}
