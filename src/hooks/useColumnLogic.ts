// import {useState, useCallback, useContext} from "react";
// import { validate } from "../core/validator";
// import {type Dot} from "../types";
// import {GameContext} from "../core/GameContext.ts";
//
// export const useColumnLogic = (items: Dot[]) => {
//     const [isHovered, setHovered] = useState<boolean>(false);
//     const [nextFreeIndex, setNextFreeIndex] = useState(5);
//     const { players, currentPlayerIndex, gameState, updateItems, changePlayer, updateState, updatePlayer } = useContext(GameContext);
//     const currentPlayer = players[currentPlayerIndex];
//
//     const updateNextFreeIndex = useCallback(() => {
//         if (nextFreeIndex < 0) return;
//         setNextFreeIndex(nextFreeIndex - 1);
//     }, [nextFreeIndex]);
//
//     const handleClick = useCallback(() => {
//         if (nextFreeIndex < 0 || gameState != "IN_PROGRESS") return;
//         const nextFreeDotId = items[nextFreeIndex].id
//         const newField= updateItems(nextFreeDotId);
//         const newGameState = validate(newField, newField[nextFreeDotId]);
//         if (newGameState != "IN_PROGRESS") {
//             const winnerId = newGameState == "FIRST_PLAYER_WIN" ? 0 : 1;
//             updatePlayer(winnerId, {winsCount: players[winnerId].winsCount + 1});
//             updateState(newGameState);
//             return;
//         }
//         changePlayer();
//         updateNextFreeIndex();
//     }, [items, nextFreeIndex, gameState, updateItems, changePlayer, updateNextFreeIndex, updatePlayer, players, updateState]);
//
//
//     return {
//         nextFreeIndex,
//         isDropPreview: isHovered && gameState == "IN_PROGRESS" && nextFreeIndex >= 0,
//         handleMouseEnter: () => setHovered(true),
//         handleMouseLeave: () => setHovered(false),
//         handleClick,
//         playerColor: currentPlayer.color,
//     };
// };