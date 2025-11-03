import {useContext} from "react";
import {GameContext} from "../core/GameContext.ts";
import type {Dot} from "../types.ts";

const GameFieldDot = ({dot, isHovered}: {dot: Dot, isHovered: boolean}) => {
    const currentPlayerColor = useContext(GameContext).color;
    return (
        <div className={`flex items-center justify-center bg-ctp-${isHovered ? currentPlayerColor + " opacity-50" : dot.color} rounded-full w-16 h-16`}>
            {dot.id}
        </div>
    )
}

export default GameFieldDot;