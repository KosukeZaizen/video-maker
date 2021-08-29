import * as React from "react";
import { useEffect, useState } from "react";
import { useUnitLength } from "../../../hooks/useUnitLength";
import { GameCommand, gameState } from "./GameState";

export type GameInfo = {
    commands: {
        type: keyof GameCommand;
        startTime: number;
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
    const playtime = usePlaytime();
    const UL = useUL();
    useCommands(gameInfo.commands);

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

function usePlaytime() {
    const [playtime, setPlaytime] = useState(0);
    useEffect(() => {
        const { gameElements, timeStep, ninja } = gameState;
        setTimeout(() => {
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

function useCommands(commands: GameInfo["commands"]) {
    useEffect(() => {
        commands.forEach(command =>
            setTimeout(() => {
                gameState.command[command.type] = true;
                setTimeout(() => {
                    gameState.command[command.type] = false;
                }, command.duration);
            }, command.startTime)
        );
    }, [commands]);
}
