import GameFieldColumn from "./GameFieldColumn.tsx";
import PlayerField from "./PlayerField.tsx";
import GameFieldStatusBar from "./GameFieldStatusBar.tsx";
import {useContext} from "react";
import {GameContext} from "../core/GameContext.ts";

const GameField = () => {
    const gameContext = useContext(GameContext);

    return (
            <div className='flex flex-col items-center gap-8 w-full'>
                <div className='flex px-10 justify-between w-full'>
                    <PlayerField player={gameContext.players[0]} nameSetter={gameContext.updatePlayer}/>
                    <div className={`w-[48rem] h-[38rem] border-ctp-lavender rounded-b-2xl border-2 border-t-0`}>
                        <div className='flex flex-row justify-around h-full w-full max-w-full'>
                            {Array(gameContext.fieldWidth).fill(0).map((_, i) => (
                                <GameFieldColumn items={gameContext.gameField.slice(i * gameContext.fieldHeight, (i + 1) * gameContext.fieldHeight)}
                                                 columnIndex={i}
                                                 key={i + gameContext.gameSeed} />
                            ))}
                        </div>
                    </div>
                    <PlayerField player={gameContext.players[1]} nameSetter={gameContext.updatePlayer}/>
                </div>
                <GameFieldStatusBar />
            </div>
    );
};

export default GameField;