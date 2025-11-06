import type {ColumnInfo, Dot, Player} from "../types.ts";

export const getInitialField = (): Record<number, Dot> => {
    const field: Record<number, Dot> = {};
    for (let i = 0; i < 42; i++) {
        field[i] = {
            id: i,
            ownerId: undefined,
            color: "surface1",
            isHovered: false,
        };
    }
    return field;
};

export const getUpdatedPlayers = (
    players: Record<number, Player>,
    id: number,
    delta: Partial<Player>): Record<number, Player> => {
    return {
        ...players,
        [id]: {...players[id], ...delta}
    }
};

export const getOwnedGameField = (
    dots: Record<number, Dot>,
    dotIndex: number,
    owner: Player
): Record<number, Dot> => {
    return {
        ...dots,
        [dotIndex]: { ...dots[dotIndex], ownerId: owner.id, color: owner.color, isHovered: false }
    };
};

export const getHoveredGameField = (
    dots: Record<number, Dot>,
    dotIndex: number,
    hoverState: boolean
): Record<number, Dot> => {
    // duh
    if (!dots[dotIndex]) {
        return dots;
    }
    return {
        ...dots,
        [dotIndex]: { ...dots[dotIndex], isHovered: hoverState }
    };
};

export const getEmptyGameField = (length: number): Dot[] => {
    return Array.from({ length: length}, (_, i) => ({
        id: i,
        ownerId: undefined,
        color: "surface1",
    }))
}

export const getUpdatedColumnsInfo = (
    columns: Record<number, ColumnInfo>,
    columnIndex: number,
    newDot: Dot): Record<number, ColumnInfo> => {
    return {
        ...columns,
        [columnIndex]: {
            id: columnIndex,
            nextFreeDot: newDot,
            nextFreeDotColumIndex: columns[columnIndex].nextFreeDotColumIndex - 1
        },
    }
}