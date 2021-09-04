import { gameState } from "../GameState";
import { GameElement, GameElementProps } from "./BaseClass";

interface Props extends GameElementProps {}

export class StageChanger extends GameElement {
    constructor(props: Props) {
        super(props);
    }

    onEachTime = () => {
        const { ninja } = gameState;

        if (this.checkTouched(ninja)) {
            const { gameInfo } = gameState;
            gameInfo.currentStage++;

            const { currentStage, stages } = gameInfo;
            const { x, y } = stages[currentStage].initialPosition;
            ninja.x = x;
            ninja.y = y;
            ninja.willAnimate = false;
            gameState.command = {};
        }
    };

    renderElement = () => null;
}
