import { GameElement } from "./GameElement";
import { Ninja } from "./GameElement/Ninja";

export interface GameState {
    timeStep: number;
    ninja: Ninja;
    gameElements: GameElement[];
    command: GameCommand;
    UL: number;
}
export const gameState: GameState = {
    timeStep: 50,
    ninja: new Ninja(0, 0, 13),
    gameElements: [],
    command: {},
    UL: 0,
};

export interface GameCommand {
    jump?: boolean;
    goLeft?: boolean;
    goRight?: boolean;
}
