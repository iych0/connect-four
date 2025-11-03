import {createContext} from "react";
import type {Dot, Player} from "../types.ts";

type GameContextType = Player & { changePlayer(): void, updateItems(id: number): Dot[]};

export const GameContext = createContext<GameContextType>({
    id: 0,
    defaultName: "первый игрок",
    name: undefined,
    color: "blue",
    changePlayer() {},
    updateItems(id: number) {return []},
});