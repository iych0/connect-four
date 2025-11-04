import {GameContext} from "../core/GameContext.ts";
import GameFieldColumn from "./GameFieldColumn.tsx";
import PlayerField from "./PlayerField.tsx";
import GameFieldStatusBar from "./GameFieldStatusBar.tsx";
import {useGameLogic} from "../hooks/useGameLogic.ts";

const GameField = () => {
    const { players,
            items,
            gameState,
            currentPlayer,
            fieldHeight,
            fieldWidth,
            updateItems,
            changePlayer,
            updatePlayerName,
            restartGame,
            updateState,
        } = useGameLogic();

    return (
        <GameContext value={{...currentPlayer,
            gameField: items,
            gameState,
            changePlayer,
            updateItems,
            updateState,
            restartGame}}>

            <div className='flex flex-col items-center gap-8 w-full'>
                <div className='flex px-10 justify-between w-full'>
                    <PlayerField player={players[0]} nameSetter={updatePlayerName}/>
                    <div className={`w-[48rem] h-[38rem] border-ctp-lavender rounded-b-2xl border-2 border-t-0`}>
                        <div className='flex flex-row justify-around h-full w-full max-w-full'>
                            {Array(fieldWidth).fill(0).map((_, i) => (
                                <GameFieldColumn items={items.slice(i * fieldHeight, (i + 1) * fieldHeight)} columnIndex={i} key={i} />
                            ))}
                        </div>
                    </div>
                    <PlayerField player={players[1]} nameSetter={updatePlayerName}/>
                </div>
                <GameFieldStatusBar player={currentPlayer} />
            </div>

        </GameContext>
    );
};

export default GameField;