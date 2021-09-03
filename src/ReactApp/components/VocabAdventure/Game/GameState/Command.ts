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

export function setCommands(playtime: number) {
    gameState.gameInfo.commandTimeline[playtime]?.forEach(c => {
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