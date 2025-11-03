import {type Dot, GameState} from "../types.ts";

// реализация функции со сложностью o(1)
export const validate = (field: Dot[], lastDot: Dot | undefined): typeof GameState[keyof typeof GameState] => {
    if (!field || !lastDot) return GameState.IN_PROGRESS;

    // очевидно, что неплохо было бы реализовать проверку на ничью в случаях помимо переполнения поля, но это пока что
    // останется как todo
    // вместо этого - небольшая оптимизация алгоритма. проверка на ничью будет проводиться только по верхней строке и только
    // тогда, когда lastDot находится в верхней строке
    if (lastDot.id % 6 == 0){
        const topRow = Array.from({ length: 6 }, (_, rowIndex) =>
            field[rowIndex * 7 + lastDot.id % 6]);
        return topRow.map((i) => i.ownerId).length == 7 ? GameState.DRAW : GameState.IN_PROGRESS;
    }

    console.log('first')

    const col = lastDot.id % 7;
    const row = Math.floor(lastDot.id / 7);

    // проверка по колонке
    const [columnStart, columnEnd] = [lastDot.id - (lastDot.id % 6), lastDot.id - (lastDot.id % 6) + 5];
    console.log('column start: ', columnStart);
    console.log('column end: ', columnEnd);
    console.log('ownerId: ', lastDot);
    if (columnEnd - lastDot.id >= 3 && field.slice(lastDot.id, lastDot.id + 4).map((i) => i.ownerId === lastDot.ownerId)) {
        return lastDot.ownerId == 0 ? GameState.FIRST_PLAYER_WIN : GameState.SECOND_PLAYER_WIN;
    }

    console.log('second')

    // проверка по строке
    const rowLine = Array.from({ length: 7 }, (_, rowIndex) =>
        field[rowIndex * 6 + lastDot.id % 6]);
    const rowResult = checkLine(rowLine, lastDot);
    if (rowResult != GameState.IN_PROGRESS) return rowResult;

    console.log('third')

    // проверка по дмагонали (слева направо)
    const fromLeftDiagonal: Dot[] = [];
    const sum = row + col;
    for (let r = Math.max(0, sum - 6); r <= Math.min(5, sum); r++) {
        const c = sum - r;
        fromLeftDiagonal.push(field[r * 7 + c]);
    }
    const mainDiagonalResult = checkLine(fromLeftDiagonal, lastDot);
    if (mainDiagonalResult != GameState.IN_PROGRESS) return mainDiagonalResult;

     console.log('fourth')

    // проверка по диагонали (справа налево)
    const fromRightDiagonal: Dot[] = [];
    const diff = row - col;
    for (let r = Math.max(0, diff); r <= Math.min(5, diff + 6); r++) {
        const c = r - diff;
        if (c >= 0 && c < 7) {
            fromRightDiagonal.push(field[r * 7 + c]);
        }
    }
    const secondaryDiagonalResult = checkLine(fromRightDiagonal, lastDot);
    if (secondaryDiagonalResult != GameState.IN_PROGRESS) return secondaryDiagonalResult;

     console.log('fifth')

    return GameState.IN_PROGRESS;
}

const checkLine = (line: Dot[], lastDot: Dot)=> {
    let counter = 0;
    for (const dot of line) {
        counter = dot.ownerId == lastDot.ownerId? counter + 1 : 0;
        if (counter == 4) return lastDot.ownerId == 1 ? GameState.FIRST_PLAYER_WIN : GameState.SECOND_PLAYER_WIN;
    }

    return GameState.IN_PROGRESS;
}