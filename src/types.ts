// le types
export type Player = {
    id: number;
    defaultName: string;
    name?: string;
    color: string;
    winsCount: number;
}

export type Dot = {
    id: number;
    ownerId? : number;
    color: string;
}

export type GameContextType = {
    gameSeed: number;
    players: Player[],
    gameField: Dot[],
    gameState: typeof GameState[keyof typeof GameState],
    fieldHeight: number,
    fieldWidth: number,
    currentPlayerIndex: number,

    changePlayer(): void,
    updateItems(id: number): Dot[],
    updatePlayer(id: number, delta: Partial<Player>): void,
    updateState(status: typeof GameState[keyof typeof GameState]): void,

    restartGame(): void
};


// le enums (линтер жалуется на enum)
export const GameState = {
    IN_PROGRESS: "IN_PROGRESS",
    FIRST_PLAYER_WIN: "FIRST_PLAYER_WIN",
    SECOND_PLAYER_WIN: "SECOND_PLAYER_WIN",
    DRAW: "DRAW"
} as const;