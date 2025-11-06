import {useGameStore} from "../store/gameStore.ts";
import {useShallow} from "zustand/react/shallow";
import * as React from "react";

const GameFieldDot = ({dotId}: {dotId: number}) => {
    const dot = useGameStore((state) => state.gameField[dotId]);
    const { players, currentPlayerIndex, gameState } = useGameStore(
        useShallow((state) => ({
            players: state.players,
            currentPlayerIndex: state.currentPlayerIndex,
            gameState: state.gameState,
        }))
    );
    const currentPlayerColor = players[currentPlayerIndex].color;
    const isHoverShown = dot.isHovered && gameState == "IN_PROGRESS"
    return (
        <div className={`flex items-center justify-center bg-ctp-${isHoverShown? currentPlayerColor + " opacity-50" : dot.color} rounded-full 
        w-8 h-8
        md:w-16 md:h-16`}>
            {dot.id}
        </div>
    )
}

export default React.memo(GameFieldDot);