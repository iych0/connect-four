import {useContext, useMemo} from "react";
import { GameContext } from "../core/GameContext.ts";

const GameFieldStatusBar = () => {
    const { gameState, players, currentPlayerIndex} = useContext(GameContext);
    const player = players[currentPlayerIndex];
    const animationKey = useMemo(
        () => (gameState === "IN_PROGRESS" ? "progress" : "finished"),
        [gameState]
    );

    return (
        <div className="flex w-full inset-0 justify-center items-center text-3xl relative h-12">
            <div key={animationKey} className={`absolute inset-0 flex justify-center items-center animate-slide-up`}>
                <span className="mr-2">
                  {gameState !== "IN_PROGRESS" ? "Побеждает" : "Сейчас ходит"}
                </span>
                <span className={`text-ctp-${player.color}`}>
                    {player.name || player.defaultName}
                </span>
            </div>
        </div>
    );
};

export default GameFieldStatusBar;