import type {Player} from "../types.ts";
import {type ChangeEvent, useContext} from "react";
import {GameContext} from "../core/GameContext.ts";

const PlayerField = ({player, nameSetter}: {player: Player, nameSetter(id: number, delta: Partial<Player>): void}) => {
    const currentPlayer = useContext(GameContext).currentPlayerIndex;
    const setName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        nameSetter(player.id, {name: e.currentTarget.value});
    }

    return (
        <div className='flex flex-col items-center gap-16'>
            <input type='text'
                   placeholder='Игрок'
                   className='transition-all text-3xl duration-100 hover:bg-ctp-surface1 focus:bg-ctp-surface1 border-b-2 border-ctp-lavender opacity-50 max-w-64'
                   onChange={setName}/>
            <div className={`rounded-full bg-ctp-${player.color} transition-shadow duration-200
             ${player.id == currentPlayer? `hollow-shadow-${player.color}` : ''} w-48 h-48`}></div>
        </div>
    )
}

export default PlayerField;