export type Player = {
    id: number;
    defaultName: string;
    name?: string;
    color: string;
}

export type Dot = {
    ownerId? : number;
    color: string;
}