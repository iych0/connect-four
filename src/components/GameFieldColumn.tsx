import {type Dot} from "../types.ts";
import GameFieldDot from "./GameFieldDot.tsx";
import {useColumnLogic} from "../hooks/useColumnLogic.ts";
import {useContext} from "react";
import {GameContext} from "../core/GameContext.ts";

const GameFieldColumn = ({items}: {items: Array<Dot>, columnIndex: number}) => {
    const { gameState } = useContext(GameContext);
    const { nextFreeIndex,
            isDropPreview,
            handleMouseEnter,
            handleMouseLeave,
            handleClick,
        } = useColumnLogic(items);

    return (
        <div className='flex w-full flex-col group'
             onMouseEnter={() => handleMouseEnter()}
             onMouseLeave={handleMouseLeave}
             onClick={handleClick}>
            <div className={`bg-linear-to-t from-ctp-surface2 to-ctp-base rounded-t-xl opacity-0 transition-opacity \
            duration-50 ${gameState == "IN_PROGRESS" ? "group-hover:opacity-100" : ""} h-[50%]`} />
            {items.map((item, index) => {
                const isHovered = isDropPreview && index === nextFreeIndex;

                return(
                <div key={index}
                     className={`flex justify-center items-center transition-colors duration-50 h-full w-full 
                     ${gameState == "IN_PROGRESS" ? "group-hover:bg-ctp-surface2" : ""} ${index % 6 == 5 ? "rounded-b-xl" : ""}`}>
                    <GameFieldDot dot={item} isHovered={isHovered}/>
                </div>
            )})}
        </div>
    );
};

export default GameFieldColumn;