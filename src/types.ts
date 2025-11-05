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
    gameState: GameState,
    fieldHeight: number,
    fieldWidth: number,
    currentPlayerIndex: number,

    changePlayer(): void,
    updateItems(id: number): Dot[],
    updatePlayer(id: number, delta: Partial<Player>): void,
    updateState(status: GameState): void,

    restartGame(): void
};


// interfaces
export interface IGameStore {
    gameSeed: number;
    players: Player[],
    gameField: Dot[],
    gameState: GameState,
    fieldHeight: number,
    fieldWidth: number,
    currentPlayerIndex: number,

    changePlayer(): void,
    updateItems(id: number): void,
    updatePlayer(id: number, delta: Partial<Player>): void,
    updateGameState(status: GameState): void,

    restartGame(): void
}


// enums
const GameStateEnum = {
    IN_PROGRESS: "IN_PROGRESS",
    FIRST_PLAYER_WIN: "FIRST_PLAYER_WIN",
    SECOND_PLAYER_WIN: "SECOND_PLAYER_WIN",
    DRAW: "DRAW"
} as const;
export type GameState = typeof GameStateEnum[keyof typeof GameStateEnum];