import {useState, useCallback, useContext} from "react";
import { validate } from "../core/validator";
import {type Dot, type Player} from "../types";
import {GameContext} from "../core/GameContext.ts";

export const useColumnLogic = (items: Dot[]) => {
    const [isHovered, setHovered] = useState<boolean>(false);
    const [nextFreeIndex, setNextFreeIndex] = useState(5);
    const { gameState, updateItems, changePlayer, updateState } = useContext(GameContext);
    const currentPlayer: Player = {...useContext(GameContext)}

    const updateNextFreeIndex = useCallback(() => {
        if (nextFreeIndex == 0) return;
        setNextFreeIndex(nextFreeIndex - 1);
    }, [nextFreeIndex]);

    const handleClick = useCallback(() => {
        if (!items[nextFreeIndex] || gameState != "IN_PROGRESS") return;
        const nextFreeDotId = items[nextFreeIndex].id
        const newField= updateItems(nextFreeDotId);
        console.log(newField);
        const newGameState = validate(newField, newField[nextFreeDotId]);
        if (newGameState != "IN_PROGRESS") {
            updateState(newGameState);
            return;
        }
        changePlayer();
        updateNextFreeIndex();
    }, [items, nextFreeIndex, gameState, updateItems, changePlayer, updateNextFreeIndex, updateState]);


    return {
        nextFreeIndex,
        isDropPreview: isHovered && gameState == "IN_PROGRESS",
        handleMouseEnter: () => setHovered(true),
        handleMouseLeave: () => setHovered(false),
        handleClick,
        playerColor: currentPlayer.color,
    };
};