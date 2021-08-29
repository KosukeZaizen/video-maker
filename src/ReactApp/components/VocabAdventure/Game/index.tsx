import * as React from "react";
import { useEffect, useState } from "react";
import { useUnitLength } from "../../../hooks/useUnitLength";
import { GameCommand, gameState } from "./GameState";

export type GameInfo = {
    commands: {
        type: keyof GameCommand;
        startTimeStep: number;
        duration: number;
    }[];
};

export function Game({
    gameInfo,
    onended,
}: {
    gameInfo: GameInfo;
    onended: () => void;
}) {
    useCommandTimeline(gameInfo.commands);
    const playtime = usePlaytime();
    const UL = useUL();

    const { ninja, gameElements } = gameState;

    return (
        <div
            style={{
                width: 160 * UL,
                height: 90 * UL,
            }}
        >
            {[ninja, ...gameElements].map(Elem => (
                <Elem.renderElement key={Elem.name} playtime={playtime} />
            ))}
        </div>
    );
}

export interface CommandTimeline {
    [key: number]: { type: keyof GameCommand; start: boolean }[];
}
function useCommandTimeline(commands: GameInfo["commands"]) {
    useEffect(() => {
        gameState.commandTimeline = commands.reduce((acc, val) => {
            const existingStartTimeEvents = acc[val.startTimeStep] ?? [];
            const mergedStartTimeEvents = [
                ...existingStartTimeEvents,
                { type: val.type, start: true },
            ];

            const existingEndTimeEvents =
                acc[val.startTimeStep + val.duration] ?? [];
            const mergedEndTimeEvents = [
                ...existingEndTimeEvents,
                { type: val.type, start: false },
            ];

            return {
                ...acc,
                [val.startTimeStep]: mergedStartTimeEvents,
                [val.startTimeStep + val.duration]: mergedEndTimeEvents,
            };
        }, {} as CommandTimeline);
    }, [commands]);
}

function usePlaytime() {
    const [playtime, setPlaytime] = useState(0);

    useEffect(() => {
        const { gameElements, timeStep, ninja, commandTimeline } = gameState;
        setTimeout(() => {
            commandTimeline[playtime]?.forEach(c => {
                gameState.command[c.type] = c.start;
            });

            ninja.onEachTime();
            gameElements.forEach(el => el.onEachTime());

            setPlaytime(playtime + 1);
        }, timeStep);
    }, [playtime]);

    return playtime;
}

function useUL() {
    const UL = useUnitLength();
    useEffect(() => {
        gameState.UL = UL;
    }, [UL]);
    return UL;
}
