import * as React from "react";
import { useEffect, useState } from "react";
import { useUnitLength } from "../../../hooks/useUnitLength";
import { gameState } from "./GameState";
import { CommandTimeline, setCommands } from "./GameState/Command";

export type GameInfo = {
    commandTimeline: CommandTimeline;
};

export function Game({
    gameInfo,
    onended,
}: {
    gameInfo: GameInfo;
    onended: () => void;
}) {
    useEffect(() => {
        gameState.gameInfo = gameInfo;
    }, [gameInfo]);

    const playTime = usePlayTime();
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
                <Elem.renderElement key={Elem.name} playTime={playTime} />
            ))}
        </div>
    );
}

function usePlayTime() {
    const [playTime, setPlayTime] = useState(0);

    useEffect(() => {
        const { gameElements, timeStep, ninja } = gameState;
        setTimeout(() => {
            setCommands(playTime);
            ninja.onEachTime();
            gameElements.forEach(el => el.onEachTime());

            setPlayTime(playTime + 1);
        }, timeStep);
    }, [playTime]);

    return playTime;
}

function useUL() {
    const UL = useUnitLength();
    useEffect(() => {
        gameState.UL = UL;
    }, [UL]);
    return UL;
}
