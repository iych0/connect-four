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

export interface IColumnStore {
    items: Dot[];
    isHovered: boolean;
    setHovered: (hovered: boolean) => void;
    handleClick: (
        globalField: Dot[],
        players: Player[],
        currentPlayerIndex: number,
        updateGlobalField: (field: Dot[]) => void,
        changePlayer: () => void,
        updatePlayer: (id: number, delta: Partial<Player>) => void,
        updateState: (state: GameState) => void
    ) => void;
}


// enums
export const GameState = {
    IN_PROGRESS: "IN_PROGRESS",
    FIRST_PLAYER_WIN: "FIRST_PLAYER_WIN",
    SECOND_PLAYER_WIN: "SECOND_PLAYER_WIN",
    DRAW: "DRAW",
} as const;

export type GameState = typeof GameState[keyof typeof GameState];