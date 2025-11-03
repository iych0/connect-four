import {useContext, useState} from "react";
import {GameContext} from "../core/GameContext.ts";
import type {Dot} from "../types.ts";
import GameFieldDot from "./GameFieldDot.tsx";

const GameFieldColumn = ({items}: {items: Array<Dot>}) => {
    // этот индекс нужен для определения точки, куда можно повесить hover эффект (предпросмотр места, куда упадет фишка при нажатии)
    const [nextFreeDotIndex, setNextFreeDotIndex] = useState(items.length);
    const gameContext = useContext(GameContext);

    const updateNextFreeDotIndex = (items: Dot[]) => {
        // самая "верхняя" занятая точка (первая, у которой определено поле ownerId)
        const closestCapturedDot = items.findIndex(e => e.ownerId != undefined);

        // вхождений не найдено - значит все точки свободны и следует взять последнюю, иначе взять точку над ближайшей занятой
        if (closestCapturedDot == 0) return;
        setNextFreeDotIndex(closestCapturedDot == -1 ? items.length - 1 : closestCapturedDot - 1);
    }

    const clearHover = () => {
        setNextFreeDotIndex(items.length);
    }

    // менять порядок вызовов очень опасно
    const captureDot = () => {
        console.log("game state from column: ", gameContext.gameState);
        if (!items[nextFreeDotIndex] && gameContext.gameState != "IN_PROGRESS") return;
        const newState= gameContext.updateItems(items[nextFreeDotIndex].id);
        gameContext.changePlayer();
        clearHover();
        updateNextFreeDotIndex(newState);
        gameContext.updateLastDot(newState[nextFreeDotIndex]);
    }

    return (
        <div className='flex w-full flex-col group' onMouseEnter={() => updateNextFreeDotIndex(items)} onMouseLeave={clearHover} onClick={captureDot}>
            <div className='bg-linear-to-t from-ctp-surface2 to-ctp-base rounded-t-xl opacity-0 transition-opacity duration-50 group-hover:opacity-100 h-[50%]' />
            {items.map((item, index) => (
                <div key={index}
                     className={`flex justify-center items-center transition-colors duration-50 h-full w-full group-hover:bg-ctp-surface2 ${index % 6 == 5 ? "rounded-b-xl" : ""}`}>
                    <GameFieldDot dot={item} isHovered={index == nextFreeDotIndex}/>
                </div>
            ))}
        </div>
    );
};

export default GameFieldColumn;