import {createContext} from "react";
import {type GameContextType} from "../types.ts";


export const GameContext = createContext<GameContextType>({
    gameSeed: 1,
    players: [],
    gameState: "IN_PROGRESS",
    gameField: [],
    fieldWidth: 7,
    fieldHeight: 6,
    currentPlayerIndex: 0,

    updatePlayer() {},
    changePlayer() {},
    updateItems() {return []},
    updateState() {},
    restartGame() {}
});