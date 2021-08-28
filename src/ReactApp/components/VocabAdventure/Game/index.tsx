import * as React from "react";
import { useEffect, useState } from "react";
import { useUnitLength } from "../../../hooks/useUnitLength";
import { GameCommand, gameState } from "./GameState";

export function Game({
    command,
    videoKey,
}: {
    command: GameCommand;
    videoKey: string;
}) {
    useEffect(() => {}, [command]);
    const playtime = usePlaytime();
    const UL = useUnitLength();

    return (
        <>
            {gameState.GameElements.map(Elem => (
                <Elem.renderElement
                    key={Elem.name}
                    UL={UL}
                    playtime={playtime}
                />
            ))}
        </>
    );
}

function usePlaytime() {
    const [playtime, setPlaytime] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            gameState.GameElements.forEach(el => el.onEachTime());
            setPlaytime(playtime + 1);
        }, gameState.timeStep);
    }, [playtime]);
    return playtime;
}
