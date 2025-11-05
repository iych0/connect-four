import GameFieldColumn from "./GameFieldColumn.tsx";
import PlayerField from "./PlayerField.tsx";
import GameFieldStatusBar from "./GameFieldStatusBar.tsx";
import {useGameStore} from "../store/gameStore.ts";

const GameField = () => {
    const { fieldWidth, fieldHeight, gameField, gameSeed} = useGameStore((state) => ({
        fieldHeight: state.fieldHeight,
        fieldWidth: state.fieldWidth,
        gameField: state.gameField,
        gameSeed: state.gameSeed,
    }))

    return (
            <div className='flex flex-col items-center gap-8 w-full'>
                <div className='flex px-10 justify-between w-full'>
                    <PlayerField playerIndex={0}/>
                    <div className={`w-[48rem] h-[38rem] border-ctp-lavender rounded-b-2xl border-2 border-t-0`}>
                        <div className='flex flex-row justify-around h-full w-full max-w-full'>
                            {Array(fieldWidth).fill(0).map((_, i) => (
                                <GameFieldColumn items={gameField.slice(i * fieldHeight, (i + 1) * fieldHeight)}
                                                 columnIndex={i}
                                                 key={i + gameSeed} />
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