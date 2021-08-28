import { GameElement } from "./GameElement";
import { Ninja } from "./GameElement/Ninja";

export interface GameState {
    timeStep: number;
    GameElements: GameElement[];
    command: GameCommand;
}
export const gameState: GameState = {
    timeStep: 50,
    GameElements: [new Ninja(0, 0, 13)],
    command: {},
};

export interface GameCommand {
    jump?: boolean;
    goLeft?: boolean;
    goRight?: boolean;
}
