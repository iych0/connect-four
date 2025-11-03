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