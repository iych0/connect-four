import { create } from 'zustand';
import type {GameState, IGameStore} from "../types.ts";
import {
    getEmptyGameField,
    getInitialField,
    getUpdatedColumnsInfo,
    getUpdatedGameField,
    getUpdatedPlayers
} from "../core/GameLogic.ts";
import {validate} from "../core/validator.ts";

export const useGameStore = create<IGameStore>()((set, get) => {
    const fieldWidth = 7;
    const fieldHeight = 6;
    const gameField = getInitialField();
    const columnsInfo = Array.from({ length: fieldWidth }, (_, i) => {
        const bottomIndex = (i + 1) * fieldHeight - 1;
        return {
            id: i,
            nextFreeDot: gameField[bottomIndex],
            nextFreeDotColumIndex: fieldHeight - 1,
        };
    });
    return {
    gameSeed: 1,

    currentPlayerIndex: 0,
    players: [
        { id: 0, defaultName: "первый игрок", name: undefined, color: "red", winsCount: 0},
        { id: 1, defaultName: "второй игрок", name: undefined, color: "blue", winsCount: 0},
    ],

    gameState: 'IN_PROGRESS',
    fieldWidth: fieldWidth,
    fieldHeight: fieldHeight,
    gameField: gameField,
    columnsInfo: columnsInfo,

    updatePlayer: (id, delta) =>
        set((state) => ({
            players: getUpdatedPlayers(state.players, id, delta),
        })),
    changePlayer: () =>
        set((state) => ({
            currentPlayerIndex: (state.currentPlayerIndex + 1) % 2
        })),
    updateGameField: (dotIndex: number) =>
        set((state) => ({
            gameField: getUpdatedGameField(state.gameField, dotIndex, undefined, state.players[state.currentPlayerIndex]),
        })),
    updateGameState: (newState: GameState) =>
        set(() => ({
            gameState: newState,
        })),
    restartGame: () => {
        const { fieldWidth, fieldHeight } = get();
        set({
            currentPlayerIndex: 0,
            gameState: 'IN_PROGRESS',
            gameField: getEmptyGameField(fieldHeight * fieldWidth),
            gameSeed: Math.random(),
        })
    },

    // todo: get dat chonky boi out of store
    handlePlayerAction: (columnIndex: number) => {
        const { gameField,
            columnsInfo,
            gameState,
            fieldWidth,
            players,
            currentPlayerIndex } = get();
        const { nextFreeDotColumIndex } = columnsInfo[columnIndex];

        if (nextFreeDotColumIndex < 0 || gameState != 'IN_PROGRESS') return;

        console.log('sup')

        const nextFreeDotId = columnIndex * fieldHeight + nextFreeDotColumIndex;
        const owner = players[currentPlayerIndex];
        const newField = getUpdatedGameField(gameField, nextFreeDotId, undefined, owner);
        console.log(newField);
        const newGameState = validate(newField, newField[nextFreeDotId])
        if (newGameState != 'IN_PROGRESS') {
            const winnerId = newGameState == "FIRST_PLAYER_WIN" ? 0 : 1;
            set((state) => ({
                players: getUpdatedPlayers(state.players,
                    winnerId,
                    {winsCount: state.players[winnerId].winsCount + 1}),
                gameState: newGameState,
            }))
            return;
        }

        const newColumnsInfo = getUpdatedColumnsInfo(columnsInfo, columnIndex, newField[nextFreeDotId])
        console.log(newColumnsInfo[0].nextFreeDot == newField[5])
        set((state) => ({
            currentPlayerIndex: (state.currentPlayerIndex + 1) % 2,
            columnsInfo: newColumnsInfo,
            gameField: newField,
        }))
    },

    // в идеале - setDotHover
    handleMouseEnter: (columnIndex: number) => {
        set((state) => ({
            gameField: getUpdatedGameField(
                state.gameField,
                state.columnsInfo[columnIndex].nextFreeDot.id,
                true),
        }))
    },

    handleMouseLeave: (columnIndex: number) => {
        set((state) => ({
            gameField: getUpdatedGameField(
                state.gameField,
                state.columnsInfo[columnIndex].nextFreeDot.id,
                false),
        }))
    }
}})