import { GameInfo } from "..";
import { Ninja } from "../GameElement/Ninja";
import { Command } from "./Command";

export interface GameState {
    readonly timeStep: number;
    ninja: Ninja;
    command: CommandStatus;
    gameInfo: GameInfo;
    UL: number;
}

export const gameState: GameState = {
    timeStep: 100,
    ninja: new Ninja({ x: 160, y: 90, width: 13 }),
    command: {},
    gameInfo: {
        stages: [],
        currentStage: 0,
    },
    UL: 0,
};

export type CommandStatus = {
    [key in Command["type"]]?: boolean;
};
