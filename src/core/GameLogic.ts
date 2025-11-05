import type {ColumnInfo, Dot, Player} from "../types.ts";

export const getInitialField = (): Record<number, Dot> => {
    const field: Record<number, Dot> = {};
    for (let i = 0; i < 42; i++) {
        field[i] = {
            id: i,
            ownerId: undefined,
            color: "surface1",
        };
    }
    return field;
};

export const getUpdatedPlayers = (
    players: Player[],
    id: number,
    delta: Partial<Player>): Player[] => {
    return players.map((player, index) =>
        index === id ? {...player, ...delta} : player)
};

export const getUpdatedGameField = (
    dots: Record<number, Dot>,
    dotIndex: number,
    hoverState?: boolean,
    owner?: Player): Record<number, Dot> => {
    if (!owner) {
        return {...dots, [dotIndex]: {...dots[dotIndex], isHovered: hoverState}}
    }
    return {...dots,
        [dotIndex-1]: {...dots[dotIndex-1], isHovered: true}, [dotIndex]: {...dots[dotIndex], ownerId: owner.id, color: owner.color}}
}

export const getEmptyGameField = (length: number): Dot[] => {
    return Array.from({ length: length}, (_, i) => ({
        id: i,
        ownerId: undefined,
        color: "surface1",
    }))
}

// ffffffffff
export const getUpdatedColumnsInfo = (
    columns: ColumnInfo[],
    columnIndex: number,
    newDot: Dot): ColumnInfo[] => {
    return [
        ...columns.slice(0, columnIndex),
        {id: columnIndex, nextFreeDot: newDot, nextFreeDotColumIndex: columns[columnIndex].nextFreeDotColumIndex - 1},
        ...columns.slice(columnIndex + 1)
    ]
}