import {useRef} from 'react';

const GameField = () => {
    const fieldHeight = 6;
    const fieldWidth = 7;
    const items= useRef<number[]>(
        Array.from({ length: fieldWidth * fieldHeight }, (_, i) => i)
    );

    return (
        <div className='flex px-10 justify-between w-full'>
            <PlayerField />
            <div className='w-[48rem] h-[38rem] border-ctp-lavender rounded-b-2xl border-2 border-t-0'>
                <div className='grid grid-flow-col h-full w-full items-end grid-cols-7 grid-rows-7 max-w-full'>
                    {Array(fieldWidth).fill(0).map((_, i) => (
                        <GameFieldColumn items={items.current.slice(i * fieldHeight, (i + 1) * fieldHeight)} key={i} />
                    ))}
                </div>
            </div>
            <PlayerField />
        </div>

    );
};

const PlayerField = () => {
    return (
        <div className='flex flex-col'>
            <span>Игрок</span> <input type='text' className='border-b-2 border-ctp-lavender opacity-50'/>
        </div>
    )
}

const GameFieldColumn = ({items}: {items: Array<number>}) => {
    return (
        <div className='contents group'>
            <div className='group-hover:bg-linear-to-t from-ctp-surface2 to-ctp-base rounded-t-xl h-[50%]'></div>
            {items.map((j) => (
                <div key={j} className={`flex justify-center items-center h-full w-full group-hover:bg-ctp-surface2 ${j % 6 == 5 ? "rounded-b-xl" : ""}`}>
                    <div className='flex items-center justify-center bg-ctp-surface1 rounded-full w-16 h-16'>
                        {j}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default GameField;