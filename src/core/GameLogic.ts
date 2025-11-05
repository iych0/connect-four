import type {Dot, Player} from "../types.ts";

export const updatePlayer = (players: Player[], id: number, delta: Partial<Player>): Player[] => {
    return players.map((player, index) =>
        index === id ? {...player, ...delta} : player)
};

export const updateGameField = (dots: Dot[], dotIndex: number, owner: Player): Dot[] => {
    return [
        ...dots.slice(0, dotIndex),
        {...dots[dotIndex], ownerId: owner.id, color: owner.color},
        ...dots.slice(dotIndex + 1),
    ];
}

export const getEmptyGameField = (length: number) => {
    return Array.from({ length: length}, (_, i) => ({
        id: i,
        ownerId: undefined,
        color: "surface1",
    }))
}

