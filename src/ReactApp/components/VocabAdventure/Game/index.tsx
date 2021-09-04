import * as React from "react";
import { useEffect, useState } from "react";
import { useUnitLength } from "../../../hooks/useUnitLength";
import { GameElement } from "./GameElement/BaseClass";
import { gameState } from "./GameState";
import { CommandTimeline, setCommands } from "./GameState/Command";

export type GameInfo = {
    currentStage: number;
    stages: {
        currentStageTime: number;
        commandTimeline: CommandTimeline;
        elements: GameElement[];
    }[];
};

export function Game({
    gameInfo: pGameInfo,
    onended,
}: {
    gameInfo: GameInfo;
    onended: () => void;
}) {
    useEffect(() => {
        gameState.gameInfo = pGameInfo;
    }, [pGameInfo]);

    const {
        ninja,
        gameInfo: { stages, currentStage },
    } = gameState;

    const playTime = usePlayTime();
    const UL = useUL();

    const stage = stages[currentStage];
    if (!stage) {
        return null;
    }

    return (
        <div
            style={{
                width: 160 * UL,
                height: 90 * UL,
            }}
        >
            {[ninja, ...stage.elements].map(Elem => (
                <Elem.renderElement key={Elem.name} playTime={playTime} />
            ))}
        </div>
    );
}

function usePlayTime() {
    const [playTime, setPlayTime] = useState(0);

    useEffect(() => {
        const {
            gameInfo: { stages, currentStage },
            timeStep,
            ninja,
        } = gameState;
        setTimeout(() => {
            const stage = stages[currentStage];

            setCommands(stage.currentStageTime);
            ninja.onEachTime();

            stage.elements.forEach(el => el.onEachTime());

            stage.currentStageTime++;
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
