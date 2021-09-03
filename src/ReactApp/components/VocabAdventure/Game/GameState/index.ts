import { GameInfo } from "..";
import { GameElement } from "../GameElement/BaseClass";
import { Block } from "../GameElement/Block";
import { Floor } from "../GameElement/Floor";
import { Ninja } from "../GameElement/Ninja";
import { Command } from "./Command";

export interface GameState {
    readonly timeStep: number;
    readonly ninja: Ninja;
    gameElements: GameElement[];
    command: CommandStatus;
    gameInfo: GameInfo;
    UL: number;
}

export const gameState: GameState = {
    timeStep: 100,
    ninja: new Ninja({ x: 140, y: 0, width: 13 }),
    gameElements: [
        new Floor({ name: "floor1", x: -120, y: 90, width: 400 }),
        new Block({
            name: "rock1",
            x: 135,
            y: 70,
            width: 25,
            imgName: "rock",
        }),
    ],
    command: {},
    gameInfo: {
        commandTimeline: {},
    },
    UL: 0,
};

export type CommandStatus = {
    [key in Command["type"]]?: boolean;
};
