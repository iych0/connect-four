import {type Dot, GameState} from "../types.ts";

export const validate = (field: Record<number, Dot>, lastDot: Dot | undefined): GameState => {
    if (!field || !lastDot) return GameState.IN_PROGRESS;
    const x = Math.floor(lastDot.id / 6);
    const y = 6 - (lastDot.id + x + 1) % 7;

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
    if (columnEnd - lastDot.id >= 3 && Array
        .from({ length: 4 }, (_, index) => field[lastDot.id + index])
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
    const [mainDiagonalLowerLength, mainDiagonalUpperLength] = [Math.min(x, y), Math.min(7 - x, 6 - y)];
    const mainDiagonalLength = mainDiagonalUpperLength + mainDiagonalLowerLength;
    const mainDiagonal = Array.from({ length: mainDiagonalLength }, (_, index) =>
        field[lastDot.id + (5 * (index - mainDiagonalLowerLength))]);
    const mainDiagonalResult = checkLine(mainDiagonal, lastDot);
    if (mainDiagonalResult != GameState.IN_PROGRESS) return mainDiagonalResult;

    // проверка по диагонали (справа налево)
    const [secondaryDiagonalLowerLength, secondaryDiagonalUpperLength] = [Math.min(6 - x, y), Math.min(x + 1, 6 - y)];
    console.log(x)
    console.log(secondaryDiagonalLowerLength, secondaryDiagonalUpperLength);
    const secondaryDiagonalLength = secondaryDiagonalUpperLength + secondaryDiagonalLowerLength;
    const secondaryDiagonal = Array.from({ length: secondaryDiagonalLength }, (_, index) =>
        field[lastDot.id - (7 * (index - secondaryDiagonalLowerLength))]);
    console.log(secondaryDiagonal)
    const secondaryDiagonalResult = checkLine(secondaryDiagonal, lastDot);
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