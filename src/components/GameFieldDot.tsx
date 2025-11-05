import {useGameStore} from "../store/gameStore.ts";
import {useShallow} from "zustand/react/shallow";

const GameFieldDot = ({dotId}: {dotId: number}) => {
    const dot = useGameStore(useShallow((state) => state.gameField[dotId]));
    const { players, currentPlayerIndex } = useGameStore();
    const currentPlayerColor = players[currentPlayerIndex].color;
    return (
        <div className={`flex items-center justify-center bg-ctp-${dot.isHovered ? currentPlayerColor + " opacity-50" : dot.color} rounded-full w-16 h-16`}>
            {dot.id}
        </div>
    )
}

export default GameFieldDot;