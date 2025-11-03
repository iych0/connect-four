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

// le enums (линтер жалуется на enum)
export const GameState = {
    IN_PROGRESS: "IN_PROGRESS",
    FIRST_PLAYER_WIN: "FIRST_PLAYER_WIN",
    SECOND_PLAYER_WIN: "SECOND_PLAYER_WIN",
    DRAW: "DRAW"
} as const;