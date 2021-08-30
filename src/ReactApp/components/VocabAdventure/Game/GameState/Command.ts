import { gameState } from ".";

export type Command =
    | {
          type: "jump";
      }
    | {
          type: "goLeft" | "goRight";
          start: boolean;
      };
export interface CommandTimeline {
    [key: number]: Command[];
}

export function setCommands(timeStep: number) {
    gameState.gameInfo.commandTimeline[timeStep]?.forEach(c => {
        switch (c.type) {
            case "jump": {
                gameState.command.jump = true;
                break;
            }
            case "goLeft":
            case "goRight": {
                gameState.command[c.type] = c.start;
                break;
            }
            default: {
                const check: never = c;
            }
        }
    });
}
