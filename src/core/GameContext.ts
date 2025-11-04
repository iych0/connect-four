import {createContext} from "react";
import {type GameContextType} from "../types.ts";


export const GameContext = createContext<GameContextType>({
    gameState: "IN_PROGRESS",
    id: 0,
    defaultName: "первый игрок",
    name: undefined,
    color: "blue",
    gameField: [],
    changePlayer() {},
    updateItems() {return []},
    updateState() {},
    restartGame() {}
});