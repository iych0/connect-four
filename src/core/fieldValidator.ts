type Position = [number, number];

interface StepResult {
    player_1: Position[];
    player_2: Position[];
    board_state: 'waiting' | 'pending' | 'win' | 'draw';
    winner?: {
        who: 'player_1' | 'player_2';
        positions: Array<Position>;
    };
}

interface ValidatorOutput {
    [key: string]: StepResult;
}

export const validator = (log: number[]): ValidatorOutput => {
    const rows = 6;
    const cols = 7;

    const output: ValidatorOutput = {
        "step_0": {
            player_1: [],
            player_2: [],
            board_state: 'waiting',
        }
    }

    const gameField: number[][] =
        Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => -1 ));
    const columnsTops = Array.from({ length: cols }, () => 0)

    for (let i = 0; i < log.length; ++i) {
        const columnIndex = log[i];
        const playerIndex = i % 2;
        // игнорируем попытки поместить фишку в переполненную колонку
        if (columnsTops[columnIndex] == rows) continue;

        let gameState: 'waiting' | 'pending' | 'win' | 'draw'  = i >= 41? "draw" : "pending";

        gameField[columnsTops[columnIndex]][columnIndex] = playerIndex;
        const placedDot: Position = [columnIndex, columnsTops[columnIndex]];
        columnsTops[columnIndex] = columnsTops[columnIndex] + 1;

        const winLine = findWinLine(gameField, placedDot);
        gameState = winLine? "win" : gameState;

        const newStepKey = "step_" + (i + 1);
        const prevStepKey = "step_" + i;

        if (winLine) {
            output[newStepKey] = {
                player_1:
                    playerIndex == 0 ? [...output[prevStepKey].player_1, placedDot] : output[prevStepKey].player_1,
                player_2:
                    playerIndex == 1 ? [...output[prevStepKey].player_2, placedDot] : output[prevStepKey].player_2,
                board_state: gameState,
                winner: {
                    who: playerIndex == 0? "player_1" : "player_2",
                    positions: winLine,
                }
            }
        } else {
            output[newStepKey] = {
                player_1:
                    playerIndex == 0 ? [...output[prevStepKey].player_1, placedDot] : output[prevStepKey].player_1,
                player_2:
                    playerIndex == 1 ? [...output[prevStepKey].player_2, placedDot] : output[prevStepKey].player_2,
                board_state: gameState
            }
        }
    }
    return output;
}

const findWinLine = (gameField: number[][], lastDot: Position): Array<Position> | null => {
    const [x, y] = lastDot;
    console.log("coords: ", x, " ", y)
    const mainDiagonalStart: Position = [x - Math.min(x, y), y - Math.min(x, y)];
    const secondaryDiagonalStart : Position = [x + Math.min(6 - x, y), y - Math.min(x, y)];

    const verticalLine = Array.from({ length: 6 }, (_, i) => gameField[i][x]);
    const vlResult = checkLine(verticalLine);
    if (vlResult != -1) return Array.from( { length: 4 }, (_, i): Position => [vlResult - 3 + i, x])

    const horizontalLine = gameField[y];
    const hlResult = checkLine(horizontalLine);
    if (hlResult != -1) return Array.from( {length: 4 }, (_, i): Position => [y, hlResult - 3 + i]);

    const mainDiagonalLine = Array.from({ length: Math.min(x, y) + Math.min(7 - x, 6 - y) },
        (_, i) => gameField[mainDiagonalStart[1] + i][mainDiagonalStart[0] + i]);
    // console.log('start: ', mainDiagonalStart);
    const mdResult = checkLine(mainDiagonalLine);
    if (mdResult != -1) return Array.from({length: 4},
        (_, i): Position => [mainDiagonalStart[1] + mdResult - 3 + i, mainDiagonalStart[0] + mdResult - 3 + i])


    const secondaryDiagonalLine = Array.from({ length: Math.min(6 - x, y) + Math.min(x + 1, 6 - y) },
        (_, i) => gameField[secondaryDiagonalStart[1] + i][secondaryDiagonalStart[0] - i]);
    console.log('start: ', secondaryDiagonalStart)
    console.log('sdl', secondaryDiagonalLine)
    const sdResult = checkLine(secondaryDiagonalLine);
    if (sdResult != -1) return Array.from({length: 4},
        (_, i): Position => [secondaryDiagonalStart[1] - sdResult + 3 - i, secondaryDiagonalStart[0] + sdResult - 3 + i])

    return null;
}

// поскольку входные данные - массив number, а не position, функция не может восстановить выигрышную последовательность
// вместо этого она возвращает индекс последнего элемента этой последовательности, по которому уже другая функция восстановит
// искомый результат
const checkLine = (line: number[]): number => {
    let counter = 1;
    for (let i = 0; i < line.length - 1; i++) {
        if (line[i] >= 0 && line[i] == line[i + 1]){
            counter++;
        } else {
            counter = 1;
        }
        if (counter == 4) return i + 1;
    }

    return -1;
}