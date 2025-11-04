import {createContext} from "react";
import {type Dot, type GameContextType, GameState} from "../types.ts";


export const GameContext = createContext<GameContextType>({
    gameState: "IN_PROGRESS",
    id: 0,
    defaultName: "первый игрок",
    name: undefined,
    color: "blue",
    gameField: [],
    changePlayer() {},
    updateItems(id: number) {return []},
    updateState(status: typeof GameState[keyof typeof GameState]) {},
    restartGame() {}
});