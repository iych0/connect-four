import GameFieldColumn from "./GameFieldColumn.tsx";
import PlayerField from "./PlayerField.tsx";
import GameFieldStatusBar from "./GameFieldStatusBar.tsx";
import {useGameStore} from "../store/gameStore.ts";
import {useShallow} from "zustand/react/shallow";

const GameField = () => {
    const { fieldWidth, gameSeed } = useGameStore(
        useShallow((state) => ({
            fieldWidth: state.fieldWidth,
            gameSeed: state.gameSeed,
        }))
    );

    return (
            <div className='flex flex-col items-center gap-8 w-full'>
                <div className='flex px-10 justify-between w-full'>
                    <PlayerField playerIndex={0}/>
                    <div className={`md:w-[48rem] md:h-[38rem] w-96 h-96
                    border-ctp-lavender rounded-b-2xl border-2 border-t-0`}>
                        <div className='flex flex-row justify-around h-full w-full max-w-full'>
                            {Array(fieldWidth).fill(0).map((_, i) => (
                            <GameFieldColumn columnIndex={i} key={i + gameSeed} />
                            ))}
                        </div>
                    </div>
                    <PlayerField playerIndex={1} />
                </div>
                <GameFieldStatusBar />
            </div>
    );
};

export default GameField;