import {useContext, useMemo} from "react";
import type { Player } from "../types.ts";
import { GameContext } from "../core/GameContext.ts";

const GameFieldStatusBar = ({ player }: { player: Omit<Player, "id"> }) => {
    const gameState = useContext(GameContext).gameState;
    const animationKey = useMemo(
        () => (gameState === "IN_PROGRESS" ? "progress" : "finished"),
        [gameState]
    );
    const isFinished = gameState !== "IN_PROGRESS";

    return (
        <div className="flex w-full inset-0 justify-center items-center text-3xl relative h-12">
            <div key={animationKey} className={`absolute inset-0 flex justify-center items-center animate-slide-up`}>
                <span className="mr-2">
                  {isFinished ? "Побеждает" : "Сейчас ходит"}
                </span>
                <span className={`text-ctp-${player.color}`}>
                    {player.name || player.defaultName}
                </span>
            </div>
        </div>
    );
};

export default GameFieldStatusBar;

// wtf is this
//
// const StatusBarInProgress = ({player}: {player: Omit<Player, "id">}) => {
//     return (
//         <div className='text-3xl transform transition-all duration-200'>
//             <span>Сейчас ходит </span>
//             <span className={`text-ctp-${player.color}`}>
//                         {player.name || player.defaultName}
//             </span>
//         </div>
//     );
// }
//
// const StatusBarResults = ({player}: {player: Omit<Player, "id">}) => {
//     return (
//         <div className='text-3xl transform transition-all duration-200'>
//             <span>Побеждает </span>
//             <span className={`text-ctp-${player.color}`}>
//                         {player.name || player.defaultName}
//             </span>
//         </div>
//     )