import { create } from 'zustand';
import type {Dot, GameState, IGameStore} from "../types.ts";
import {getEmptyGameField, updateGameField, updatePlayer} from "../core/GameLogic.ts";

const useGameStore = create<IGameStore>()((set, get) => ({
    gameSeed: 1,
    players: [
        { id: 0, defaultName: "первый игрок", name: undefined, color: "red", winsCount: 0},
        { id: 1, defaultName: "второй игрок", name: undefined, color: "blue", winsCount: 0},
    ],
    currentPlayerIndex: 0,
    gameState: 'IN_PROGRESS',
    gameField: Array.from({ length: 42 }, (_, i) => ({
        id: i,
        ownerId: undefined,
        color: "surface1",
    })),
    fieldWidth: 7,
    fieldHeight: 6,

    updatePlayer: (id, delta) =>
        set((state) => ({
            players: updatePlayer(state.players, id, delta),
        })),
    changePlayer: () =>
        set((state) => ({
            currentPlayerIndex: (state.currentPlayerIndex + 1) % 2
        })),
    updateItems: (dotIndex: number) =>
        set((state) => ({
            gameField: updateGameField(state.gameField, dotIndex, state.players[state.currentPlayerIndex]),
        })),
    updateGameState: (newState: GameState) =>
        set(() => ({
            gameState: newState,
        })),
    restartGame: () => {
        const state = get();
        set({
            currentPlayerIndex: 0,
            gameState: 'IN_PROGRESS',
            gameField: getEmptyGameField(state.fieldHeight * state.fieldWidth),
            gameSeed: Math.random(),
        })
    },

    updateItemsAndGet: (dotIndex: number): Dot[] => {
        const state = get();
        const player = state.players[state.currentPlayerIndex];
        const newField = updateGameField(state.gameField, dotIndex, player);

        set({ gameField: newField });
        return newField;
    },
}))