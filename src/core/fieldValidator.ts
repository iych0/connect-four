// type Coord = [row: number, col: number];
//
// type Winner = {
//     who: string;
//     positions: Coord[];
// }
//
// type Step = {
//     player_1: Coord[];
//     player_2: Coord[];
//     boardState: "waiting" | "pending" | "win" | "draw";
//     winner?: Winner;
// }
//
// type GameHistory = {
//     step_0: Step;
//     [key: `step_${number}`]: Step;
// }