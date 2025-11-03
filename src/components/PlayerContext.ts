import {createContext} from "react";
import type {Player} from "../types.ts";

export const PlayerContext = createContext<Player>({id: 0, defaultName: "первый игрок", name: undefined, color: "red"});