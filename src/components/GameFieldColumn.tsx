import GameFieldDot from "./GameFieldDot.tsx";
import {useGameStore} from "../store/gameStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useCallback, useMemo} from "react";
import * as React from "react";

const GameFieldColumn = ({columnIndex}: {columnIndex: number}) => {
    const { handleMouseEnter, handleMouseLeave, handlePlayerAction, gameState } = useGameStore(
        useShallow((state) => ({
            handleMouseEnter: state.handleMouseEnter,
            handleMouseLeave: state.handleMouseLeave,
            handlePlayerAction: state.handlePlayerAction,
            gameState: state.gameState,
        }))
    );

    const onEnter = useCallback(() => {
        handleMouseEnter(columnIndex);
    }, [handleMouseEnter, columnIndex]);

    const onLeave = useCallback(() => {
        handleMouseLeave(columnIndex);
    }, [handleMouseLeave, columnIndex]);

    const onClick = useCallback(() => {
        handlePlayerAction(columnIndex);
    }, [handlePlayerAction, columnIndex]);

    const numbers = useMemo(() => Array.from({length: 6}, (_ , num) => num + columnIndex * 6), [columnIndex]);
    return (
        <div className='flex w-full flex-col group'
             onMouseEnter={onEnter}
             onMouseLeave={onLeave}
             onClick={onClick}>
            <div className={`bg-linear-to-t from-ctp-surface2 to-ctp-base rounded-t-xl opacity-0 transition-opacity \
            duration-50 ${gameState == "IN_PROGRESS" ? "group-hover:opacity-100" : ""} h-[50%]`} />
            {numbers.map((dotId, index) =>
                <div key={index}
                     className={`flex justify-center items-center transition-colors duration-50 h-full w-full 
                     ${gameState == "IN_PROGRESS" ? "group-hover:bg-ctp-surface2" : ""} ${index % 6 == 5 ? "rounded-b-xl" : ""}`}>
                    <GameFieldDot dotId={dotId}/>
                </div>
            )}
        </div>
    );
};

export default React.memo(GameFieldColumn);