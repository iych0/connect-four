import {type ChangeEvent, createContext, type Dispatch, type SetStateAction, useContext, useRef, useState} from 'react';
import type {Dot, Player} from "../types.ts";
import {PlayerContext} from "./PlayerContext.ts";

const GameField = () => {
    const fieldHeight = 6;
    const fieldWidth = 7;

    const [players, setPlayers] = useState<Player[]>([
        {id: 0, defaultName: "первый игрок", name: undefined, color: "red"},
        {id: 1, defaultName: "второй игрок", name: undefined, color: "blue"},
    ]);

    const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0]);
    const PlayerContext = createContext(currentPlayer);

    const items= useRef<Dot[]>(
        Array.from({ length: fieldWidth * fieldHeight }, () => ({ownerId: undefined, color: "surface1"}))
    );

    return (
        <PlayerContext value={currentPlayer}>
            <div className='flex flex-col items-center gap-8 w-full'>
                <div className='flex px-10 justify-between w-full'>
                    <PlayerField player={players[0]} nameSetter={setCurrentPlayer}/>
                    <div className='w-[48rem] h-[38rem] border-ctp-lavender rounded-b-2xl border-2 border-t-0'>
                        <div className='flex flex-row justify-around h-full w-full max-w-full'>
                            {Array(fieldWidth).fill(0).map((_, i) => (
                                <GameFieldColumn items={items.current.slice(i * fieldHeight, (i + 1) * fieldHeight)} key={i} />
                            ))}
                        </div>
                    </div>
                    <PlayerField player={players[1]} nameSetter={setCurrentPlayer}/>
                </div>
                <div className='text-3xl transform transition-all duration-200'>
                    <span>Сейчас ходит </span>
                    <span className={`text-ctp-${currentPlayer.color}`}>
                        {currentPlayer.name || currentPlayer.defaultName}
                    </span>
                </div>
            </div>
        </PlayerContext>
    );
};

const PlayerField = ({player, nameSetter}: {player: Player, nameSetter: Dispatch<SetStateAction<Player>>}) => {
    const setName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(player);
        nameSetter(prevState => ({...prevState, name: e.target.value}));
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
    const [nextFreeDot, setNextFreeDot] = useState(items.length);

    const updateNextFreeDot = () => {
        // самая "верхняя" занятая точка (первая, у которой определено поле ownerId)
        const closestCapturedDot = items.findIndex(e => e.ownerId != undefined);

        // вхождений не найдено - значит все точки свободны и следует взять последнюю, иначе взять точку над ближайшей занятой
        setNextFreeDot(closestCapturedDot == -1 ? items.length - 1 : closestCapturedDot - 1);
        console.log(closestCapturedDot)
    }

    const clearHover = () => {
        setNextFreeDot(items.length);
    }

    return (
        <div className='flex w-full flex-col group' onMouseEnter={updateNextFreeDot} onMouseLeave={clearHover}>
            <div className='bg-linear-to-t from-ctp-surface2 to-ctp-base rounded-t-xl opacity-0 transition-opacity duration-50 group-hover:opacity-100 h-[50%]' />
            {items.map((item, index) => (
                <div key={index}
                     className={`flex justify-center items-center transition-colors duration-50 h-full w-full group-hover:bg-ctp-surface2 ${index % 6 == 5 ? "rounded-b-xl" : ""}`}>
                    <GameFieldDot dot={item} isHovered={index == nextFreeDot}/>
                </div>
            ))}
        </div>
    );
};

const GameFieldDot = ({dot, isHovered}: {dot: Dot, isHovered: boolean}) => {
    const currentPlayerColor = useContext(PlayerContext).color;
    return (
        <div className={`flex items-center justify-center bg-ctp-${isHovered ? currentPlayerColor + " opacity-50" : dot.color} rounded-full w-16 h-16`}>
            d
        </div>
    )
}

export default GameField;