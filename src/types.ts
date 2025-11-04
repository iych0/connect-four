// le types
export type Player = {
    id: number;
    defaultName: string;
    name?: string;
    color: string;
}

export type Dot = {
    id: number;
    ownerId? : number;
    color: string;
}

export type GameContextType = Player & {
    gameField: Dot[],
    gameState: typeof GameState[keyof typeof GameState],
    changePlayer(): void,
    updateItems(id: number): Dot[],
    updateLastDot(dot: Dot): void,
    updateState(status: typeof GameState[keyof typeof GameState]): void,
};

// le enums (линтер жалуется на enum)
export const GameState = {
    IN_PROGRESS: "IN_PROGRESS",
    FIRST_PLAYER_WIN: "FIRST_PLAYER_WIN",
    SECOND_PLAYER_WIN: "SECOND_PLAYER_WIN",
    DRAW: "DRAW"
} as const;