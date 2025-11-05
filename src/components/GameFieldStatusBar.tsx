import {useMemo} from "react";
import {useGameStore} from "../store/gameStore.ts";

const GameFieldStatusBar = () => {
    const { players, currentPlayerIndex, gameState, restartGame } = useGameStore();

    const player = players[currentPlayerIndex];
    const animationKey = useMemo(
        () => (gameState === "IN_PROGRESS" ? "progress" : "finished"),
        [gameState]
    );

    const handleClick = () => {
        if (gameState === "IN_PROGRESS") return;
        restartGame();
    }

    return (
        <div className="flex w-full inset-0 justify-center items-center text-3xl relative h-12">
            <div key={animationKey}
                 onClick={handleClick}
                 className={`absolute inset-0 flex flex-col justify-center items-center animate-slide-up select-none
                 ${gameState !== "IN_PROGRESS" ? "cursor-pointer" : ''}`}>
                <div className=''>
                    <span className="mr-2">
                      {gameState !== "IN_PROGRESS" ? "Побеждает" : "Сейчас ходит"}
                    </span>
                    <span className={`text-ctp-${player.color}`}>
                        {player.name || player.defaultName}
                    </span>
                </div>
                {gameState !== "IN_PROGRESS" ?
                    <div className='text-lg'>Кликните сюда, чтобы начать сначала</div>
                    : null}
            </div>
        </div>
    );
};

export default GameFieldStatusBar;