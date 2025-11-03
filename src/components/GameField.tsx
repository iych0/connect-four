import {useCallback, useEffect, useState} from 'react';
import {type Dot, GameState, type Player} from "../types.ts";
import {GameContext} from "../core/GameContext.ts";
import {validate} from "../core/validator.ts";
import GameFieldColumn from "./GameFieldColumn.tsx";
import PlayerField from "./PlayerField.tsx";
import GameFieldStatusBar from "./GameFieldStatusBar.tsx";

const GameField = () => {
    const fieldHeight = 6;
    const fieldWidth = 7;

    const [gameState, setGameState] = useState<typeof GameState[keyof typeof GameState]>("IN_PROGRESS")

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
        const validateResult = validate(items, lastDot)
        console.log("validateMsg: ", validateResult)
        setGameState(validateResult)
    }, [items, lastDot]);

    return (
        <GameContext value={{...players[currentPlayerIndex], gameState, changePlayer, updateItems, updateLastDot}}>

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
                <GameFieldStatusBar player={players[currentPlayerIndex]} />
            </div>

        </GameContext>
    );
};

export default GameField;