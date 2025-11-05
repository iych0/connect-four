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
    isHovered?: boolean;
}

export type ColumnInfo = {
    id: number;
    nextFreeDot: Dot,
    nextFreeDotColumIndex: number;
}

// interfaces
export interface IGameStore {
    gameSeed: number;
    players: Player[],
    currentPlayerIndex: number,

    gameField: Record<number, Dot>,
    gameState: GameState,
    fieldHeight: number,
    fieldWidth: number,
    columnsInfo: ColumnInfo[],

    changePlayer(): void,
    updateGameField(id: number): void,
    updatePlayer(id: number, delta: Partial<Player>): void,
    updateGameState(status: GameState): void,

    restartGame(): void

    handlePlayerAction(columnIndex: number): void,
    handleMouseEnter(columnIndex: number): void,
    handleMouseLeave(columnIndex: number): void
}

// enums
export const GameState = {
    IN_PROGRESS: "IN_PROGRESS",
    FIRST_PLAYER_WIN: "FIRST_PLAYER_WIN",
    SECOND_PLAYER_WIN: "SECOND_PLAYER_WIN",
    DRAW: "DRAW",
} as const;

export type GameState = typeof GameState[keyof typeof GameState];