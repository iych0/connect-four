import {type ChangeEvent, useCallback, useContext, useEffect, useState} from 'react';
import type {Dot, Player} from "../types.ts";
import {GameContext} from "../core/GameContext.ts";
import {validate} from "../core/validator.ts";

const GameField = () => {
    const fieldHeight = 6;
    const fieldWidth = 7;

    const [debugMsg, setDebugMsg] = useState<string | undefined>(undefined);

    const [players, setPlayers] = useState<Player[]>([
        {id: 0, defaultName: "первый игрок", name: undefined, color: "red"},
        {id: 1, defaultName: "второй игрок", name: undefined, color: "blue"},
    ]);

    const [lastDot, setLastDot] = useState<Dot>();
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

    const [items, setItems] = useState<Dot[]>(
        Array.from({ length: fieldWidth * fieldHeight }, (_, i) => ({id: i, ownerId: undefined, color: "surface1"}))
    );

    const updatePlayerName = (name: string, id: number): void => {
        setPlayers((prevState) =>
            prevState.map((player, i) =>
                i === id ? { ...player, name } : player
            )
        );
    };

    const changePlayer = useCallback(() => {
        setCurrentPlayerIndex((currentPlayerIndex + 1) % 2);
    }, [currentPlayerIndex])

    const updateItems = useCallback((id: number) => {
        const newItems = items.map((item, i) =>
            i === id ? { ...item, id: item.id, ownerId: currentPlayerIndex, color: players[currentPlayerIndex].color } : item
        );
        setItems(newItems);
        return newItems.slice(id - (id % 6), id - (id % 6) + 6);
    }, [currentPlayerIndex, items, players]);

    const updateLastDot = (dot: Dot) => {
        setLastDot(dot);
    }

    useEffect(() => {
        const validateMsg = validate(items, lastDot)
        setDebugMsg(validateMsg)
        console.log("validateMsg: ", validateMsg)
    }, [items, lastDot]);

    return (
        <GameContext value={{...players[currentPlayerIndex], changePlayer, updateItems, updateLastDot}}>
            <div className='flex flex-col items-center gap-8 w-full'>
                <div className='flex px-10 justify-between w-full'>
                    <PlayerField player={players[0]} nameSetter={updatePlayerName}/>
                    <div className='w-[48rem] h-[38rem] border-ctp-lavender rounded-b-2xl border-2 border-t-0'>
                        <div className='flex flex-row justify-around h-full w-full max-w-full'>
                            {Array(fieldWidth).fill(0).map((_, i) => (
                                <GameFieldColumn items={items.slice(i * fieldHeight, (i + 1) * fieldHeight)} key={i} />
                            ))}
                        </div>
                    </div>
                    <PlayerField player={players[1]} nameSetter={updatePlayerName}/>
                </div>
                <div className='text-3xl transform transition-all duration-200'>
                    <span>Сейчас ходит </span>
                    <span className={`text-ctp-${players[currentPlayerIndex].color}`}>
                        {players[currentPlayerIndex].name || players[currentPlayerIndex].defaultName}
                    </span>
                </div>
            </div>
            <div>
                {debugMsg? "Валидатор высрал " + debugMsg : "Тут будут статусы валидатора"}</div>
        </GameContext>
    );
};

const PlayerField = ({player, nameSetter}: {player: Player, nameSetter(name: string, id: number): void}) => {
    const setName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(player);
        nameSetter(e.currentTarget.value, player.id);
    }

    return (
        <div className='flex flex-col items-center gap-16'>
            <input type='text'
                   placeholder='Игрок'
                   className='transition-all text-3xl duration-100 hover:bg-ctp-surface1 focus:bg-ctp-surface1 border-b-2 border-ctp-lavender opacity-50 max-w-64'
                   onChange={setName}/>
            <div className={`rounded-full bg-ctp-${player.color} w-48 h-48`}></div>
        </div>
    )
}

const GameFieldColumn = ({items}: {items: Array<Dot>}) => {
    // этот индекс нужен для определения точки, куда можно повесить hover эффект (предпросмотр места, куда упадет фишка при нажатии)
    const [nextFreeDotIndex, setNextFreeDotIndex] = useState(items.length);
    const callbacks = useContext(GameContext);

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
        if (!items[nextFreeDotIndex]) return;
        const newState= callbacks.updateItems(items[nextFreeDotIndex].id);
        callbacks.changePlayer();
        clearHover();
        updateNextFreeDotIndex(newState);
        callbacks.updateLastDot(newState[nextFreeDotIndex]);
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

const GameFieldDot = ({dot, isHovered}: {dot: Dot, isHovered: boolean}) => {
    const currentPlayerColor = useContext(GameContext).color;
    return (
        <div className={`flex items-center justify-center bg-ctp-${isHovered ? currentPlayerColor + " opacity-50" : dot.color} rounded-full w-16 h-16`}>
            {dot.id}
        </div>
    )
}

export default GameField;