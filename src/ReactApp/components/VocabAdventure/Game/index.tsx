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
        initialPosition: { x: number; y: number };
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
        const { stages, currentStage } = pGameInfo;
        const { x, y } = stages[currentStage].initialPosition;
        gameState.ninja.x = x;
        gameState.ninja.y = y;
    }, [pGameInfo]);

    const {
        ninja,
        gameInfo: { stages, currentStage },
        UL,
    } = gameState;

    const playTime = usePlayTime();
    useUL();

    const stage = stages[currentStage];
    if (!stage || !UL) {
        return null;
    }

    return (
        <div
            style={{
                width: 160 * UL,
                height: 90 * UL,
                backgroundColor: "black",
                zIndex: -1,
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
            setCommands();
            ninja.onEachTime();

            const stage = stages[currentStage];
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
}
