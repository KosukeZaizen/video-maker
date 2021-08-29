import { GameElement } from ".";
import { gameState } from "../GameState";

export class Floor extends GameElement {
    constructor(name: string, x: number, y: number, width: number) {
        super(name, x, y, width);
    }

    onEachTime = () => {
        const { ninja } = gameState;
        if (this.checkTouched(ninja)) {
            const direction = this.getTargetDirection(ninja);
            if (direction === "top") {
                ninja.y = this.y - ninja.width;
            }
        }
    };

    renderElement = () => null;
}
