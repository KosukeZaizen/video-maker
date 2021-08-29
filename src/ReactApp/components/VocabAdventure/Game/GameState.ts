import { CommandTimeline } from ".";
import { GameElement } from "./GameElement/BaseClass";
import { Block } from "./GameElement/Block";
import { Floor } from "./GameElement/Floor";
import { Ninja } from "./GameElement/Ninja";

export interface GameState {
    timeStep: number;
    ninja: Ninja;
    gameElements: GameElement[];
    command: GameCommand;
    commandTimeline: CommandTimeline;
    UL: number;
}

export const gameState: GameState = {
    timeStep: 100,
    ninja: new Ninja({ x: 140, y: 0, width: 13 }),
    gameElements: [
        new Floor({ name: "floor1", x: -20, y: 90, width: 200 }),
        new Block({
            name: "stone1",
            x: 135,
            y: 70,
            width: 25,
            imgName: "rock",
        }),
    ],
    command: {},
    commandTimeline: {},
    UL: 0,
};

export interface GameCommand {
    jump?: boolean;
    goLeft?: boolean;
    goRight?: boolean;
}
