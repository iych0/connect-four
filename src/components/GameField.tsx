import {type ChangeEvent, type Dispatch, type SetStateAction, useRef, useState} from 'react';

type Player = {
    id: number;
    defaultName: string;
    name?: string;
    color: string;
}

type Dot = {
    ownerId? : number;
    color: string;
}

const GameField = () => {
    const fieldHeight = 6;
    const fieldWidth = 7;

    const [firstPlayer, setFirstPlayer] = useState<Player>({id: 1, defaultName: 'первый игрок', name: '', color: 'red'});
    const [secondPlayer, setSecondPlayer] = useState<Player>({id: 2, defaultName: 'второй игрок', name: '', color: 'blue'});

    const [currentPlayer, setCurrentPlayer] = useState<Player>(firstPlayer);

    const items= useRef<number[]>(
        Array.from({ length: fieldWidth * fieldHeight }, (_, i) => i)
    );

    return (
        <div className='flex flex-col items-center gap-8 w-full'>
            <div className='flex px-10 justify-between w-full'>
                <PlayerField player={firstPlayer} nameSetter={setFirstPlayer}/>
                <div className='w-[48rem] h-[38rem] border-ctp-lavender rounded-b-2xl border-2 border-t-0'>
                    <div className='flex flex-row justify-around h-full w-full max-w-full'>
                        {Array(fieldWidth).fill(0).map((_, i) => (
                            <GameFieldColumn items={items.current.slice(i * fieldHeight, (i + 1) * fieldHeight)} key={i} />
                        ))}
                    </div>
                </div>
                <PlayerField player={secondPlayer} nameSetter={setSecondPlayer}/>
            </div>
            <div className='text-3xl transform transition-all duration-200'>
                <span>Сейчас ходит </span>
                <span className={`text-ctp-${currentPlayer.color}`}>
                    {currentPlayer.name ?? currentPlayer.defaultName}
                </span>
            </div>
        </div>
    );
};

const PlayerField = ({player, nameSetter}: {player: Player, nameSetter: Dispatch<SetStateAction<Player>>}) => {
    const setName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        nameSetter({...player, name: e.currentTarget.value});
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

const GameFieldColumn = ({items}: {items: Array<number>}) => {
    return (
        <div className='flex w-full flex-col group'>
            <div className='bg-linear-to-t from-ctp-surface2 to-ctp-base rounded-t-xl opacity-0 transition-opacity duration-50 group-hover:opacity-100 h-[50%]'></div>
            {items.map((j) => (
                <div key={j} className={`flex justify-center items-center transition-colors duration-50 h-full w-full group-hover:bg-ctp-surface2 ${j % 6 == 5 ? "rounded-b-xl" : ""}`}>
                    <div className='flex items-center justify-center bg-ctp-surface1 rounded-full w-16 h-16'>
                        {j}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default GameField;