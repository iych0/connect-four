import {createContext} from "react";
import type {Dot, GameContextType} from "../types.ts";


export const GameContext = createContext<GameContextType>({
    gameState: "IN_PROGRESS",
    id: 0,
    defaultName: "первый игрок",
    name: undefined,
    color: "blue",
    changePlayer() {},
    updateItems(id: number) {return []},
    updateLastDot(dot: Dot) {}
});