import { useState, useCallback } from "react";
import {type Dot, type Player, GameState } from "../types.ts";

const FIELD_HEIGHT = 6;
const FIELD_WIDTH = 7;

export const useGameLogic = () => {
    const [players, setPlayers] = useState<Player[]>([
        { id: 0, defaultName: "первый игрок", name: undefined, color: "red", winsCount: 0},
        { id: 1, defaultName: "второй игрок", name: undefined, color: "blue", winsCount: 0},
    ]);

    const [items, setItems] = useState<Dot[]>(
        Array.from({ length: FIELD_WIDTH * FIELD_HEIGHT }, (_, i) => ({
            id: i,
            ownerId: undefined,
            color: "surface1",
        }))
    );

    const [gameSeed, setGameSeed] = useState<number>(1);
    const [gameState, setGameState] = useState<typeof GameState[keyof typeof GameState]>("IN_PROGRESS");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const currentPlayer: Player = players[currentPlayerIndex];

    // callback-и
    const changePlayer = useCallback(() => {
        setCurrentPlayerIndex((i) => (i + 1) % 2);
    }, []);

    const updateItems = useCallback((id: number) => {
        const newItems = items.map((item, i) =>
            i === id ? { ...item, id: item.id, ownerId: currentPlayerIndex, color: players[currentPlayerIndex].color } : item
        );
        setItems(newItems);
        return newItems;
    }, [currentPlayerIndex, items, players]);

    const updatePlayer = useCallback((id: number, delta: Partial<Player>) => {
        setPlayers(prev => prev.map(player =>
            player.id === id
                ? { ...player, ...delta}
                : player
        ));
    }, []);

    const updateState = useCallback((newState: typeof GameState[keyof typeof GameState]) => {
        setGameState(newState);
    }, []);

    const restartGame = useCallback(() => {
        console.log("restarting");
        setGameSeed(Math.random())
        setItems(
            Array.from({ length: FIELD_WIDTH * FIELD_HEIGHT }, (_, i) => ({
                id: i,
                ownerId: undefined,
                color: "surface1",
            }))
        );
        setGameState("IN_PROGRESS");
        setCurrentPlayerIndex(0);
    }, []);

    return {
        gameSeed,
        players,
        items,
        gameState,
        currentPlayer,
        fieldHeight: FIELD_HEIGHT,
        fieldWidth: FIELD_WIDTH,
        currentPlayerIndex,

        updateItems,
        changePlayer,
        updatePlayer,
        updateState,
        restartGame,
    };
};