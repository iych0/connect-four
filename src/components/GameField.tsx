import {useState} from 'react';

const GameField = () => {
    const [items, setItems] = useState<number[]>(
        Array.from({ length: 42 }, (_, i) => i + 1)
    );


    return (
        <div className='w-[48rem] h-[34rem] border-ctp-lavender rounded-b-2xl border-2 border-t-0'>
            <div className='grid h-full w-full items-center grid-cols-7 grid-rows-6 max-w-full'>
                {items.map((i) => (
                    <div key={i} className='flex justify-center items-center h-full w-full'>
                        <div className='flex items-center justify-center bg-ctp-surface1 rounded-full w-16 h-16'>
                            {i}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameField;