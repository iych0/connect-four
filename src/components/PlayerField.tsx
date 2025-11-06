import {type ChangeEvent} from "react";
import {useGameStore} from "../store/gameStore.ts";
import {useShallow} from "zustand/react/shallow";

const PlayerField = ({playerIndex} : {playerIndex: number}) => {
    const { players, currentPlayerIndex, updatePlayer } = useGameStore(
        useShallow((state) => ({
            players: state.players,
            currentPlayerIndex: state.currentPlayerIndex,
            updatePlayer: state.updatePlayer,
        }))
    );
    const fieldOwner = players[playerIndex];
    const setName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        updatePlayer(playerIndex, {name: e.currentTarget.value});
    }

    return (
        <div className='flex flex-col items-center gap-16'>
            <input type='text'
                   placeholder='Игрок'
                   className='transition-all text-3xl duration-100 hover:bg-ctp-surface1 focus:bg-ctp-surface1 border-b-2 border-ctp-lavender opacity-50 max-w-64'
                   onChange={setName}/>
            <div className={`rounded-full bg-ctp-${fieldOwner.color} transition-shadow duration-200
             ${fieldOwner.id == currentPlayerIndex? `hollow-shadow-${fieldOwner.color}` : ''} w-48 h-48`}></div>
        </div>
    )
}

export default PlayerField;