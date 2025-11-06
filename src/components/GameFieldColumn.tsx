import GameFieldDot from "./GameFieldDot.tsx";
import {useGameStore} from "../store/gameStore.ts";
import {useShallow} from "zustand/react/shallow";

const GameFieldColumn = ({columnIndex}: {columnIndex: number}) => {
    const { handleMouseEnter, handleMouseLeave, handlePlayerAction, gameState } = useGameStore(
        useShallow((state) => ({
            handleMouseEnter: state.handleMouseEnter,
            handleMouseLeave: state.handleMouseLeave,
            handlePlayerAction: state.handlePlayerAction,
            gameState: state.gameState,
        }))
    );
    return (
        <div className='flex w-full flex-col group'
             onMouseEnter={() => handleMouseEnter(columnIndex)}
             onMouseLeave={() => handleMouseLeave(columnIndex)}
             onClick={() => handlePlayerAction(columnIndex)}>
            <div className={`bg-linear-to-t from-ctp-surface2 to-ctp-base rounded-t-xl opacity-0 transition-opacity \
            duration-50 ${gameState == "IN_PROGRESS" ? "group-hover:opacity-100" : ""} h-[50%]`} />
            {Array.from({length: 6}, (_ , num) => num + columnIndex * 6).map((dotId, index) =>
                <div key={index}
                     className={`flex justify-center items-center transition-colors duration-50 h-full w-full 
                     ${gameState == "IN_PROGRESS" ? "group-hover:bg-ctp-surface2" : ""} ${index % 6 == 5 ? "rounded-b-xl" : ""}`}>
                    <GameFieldDot dotId={dotId}/>
                </div>
            )}
        </div>
    );
};

export default GameFieldColumn;