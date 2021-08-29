import { GameElement } from "./GameElement/BaseClass";
import { Block } from "./GameElement/Block";
import { Floor } from "./GameElement/Floor";
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
    ninja: new Ninja(140, 0, 13),
    gameElements: [
        new Floor("floor1", -20, 90, 200),
        new Block("stone1", 135, 70, 25, "rock"),
    ],
    command: {},
    UL: 0,
};

export interface GameCommand {
    jump?: boolean;
    goLeft?: boolean;
    goRight?: boolean;
}
