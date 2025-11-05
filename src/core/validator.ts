import {type Dot, GameState} from "../types.ts";

export const validate = (field: Dot[], lastDot: Dot | undefined): GameState => {
    if (!field || !lastDot) return GameState.IN_PROGRESS;

    // очевидно, что неплохо было бы реализовать проверку на ничью в случаях помимо переполнения поля, но это пока что
    // останется как todo
    // вместо этого - небольшая оптимизация алгоритма. проверка на ничью будет проводиться только по верхней строке и только
    // тогда, когда lastDot находится в верхней строке
    if (lastDot.id % 6 == 0){
        const topRow = Array.from({ length: 7 }, (_, index) =>
            field[index * 6]);
        if (topRow.filter((i) => i.ownerId != undefined).length == 7) return GameState.DRAW;
    }

    // проверка по колонке
    const columnEnd =  lastDot.id - (lastDot.id % 6) + 5;
    if (columnEnd - lastDot.id >= 3 && field
        .slice(lastDot.id, lastDot.id + 4)
        .filter((i) => i.ownerId === lastDot.ownerId)
        .length == 4)  {
        return lastDot.ownerId == 0 ? GameState.FIRST_PLAYER_WIN : GameState.SECOND_PLAYER_WIN;
    }

    // проверка по строке
    const rowLine = Array.from({ length: 7 }, (_, rowIndex) =>
        field[rowIndex * 6 + lastDot.id % 6]);
    const rowResult = checkLine(rowLine, lastDot);
    if (rowResult != GameState.IN_PROGRESS) return rowResult;

    // проверка по дмагонали (слева направо)
    const fromLeftDiagonal = Array.from({ length: Math.floor(lastDot.id / 5) }, (_, index) =>
        field[lastDot.id - (5 * index)]);
    const mainDiagonalResult = checkLine(fromLeftDiagonal, lastDot);
    if (mainDiagonalResult != GameState.IN_PROGRESS) return mainDiagonalResult;

    // проверка по диагонали (справа налево)
    const fromRightDiagonal = Array.from({ length: Math.floor((41 - lastDot.id) / 7) }, (_, index) =>
        field[lastDot.id + (7 * index)]);
    const secondaryDiagonalResult = checkLine(fromRightDiagonal, lastDot);
    if (secondaryDiagonalResult != GameState.IN_PROGRESS) return secondaryDiagonalResult;

    return GameState.IN_PROGRESS;
}

const checkLine = (line: Dot[], lastDot: Dot)=> {
    let counter = 0;
    for (const dot of line) {
        counter = dot.ownerId == lastDot.ownerId? counter + 1 : 0;
        if (counter == 4) return lastDot.ownerId == 0 ? GameState.FIRST_PLAYER_WIN : GameState.SECOND_PLAYER_WIN;
    }
    return GameState.IN_PROGRESS;
}