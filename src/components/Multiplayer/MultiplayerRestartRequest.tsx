import {useMultiplayerStore} from "../../store/multiplayerStore.ts";

const MultiplayerRestartRequest = () => {
    const isRestartRequested = useMultiplayerStore(state => state.isRestartRequested);
    const acceptRestart = useMultiplayerStore(state => state.answerOnRestartRequest)
    const rejectRestart = useMultiplayerStore(state => state.answerOnRestartRequest)


    if (!isRestartRequested) return null;

    return (
        <div className={`animate-slide-down fixed w-[32rem] h-32 -top-32 left-48 text-center border-2 border-t-0 rounded-b-xl
        flex flex-col gap-10 border-ctp-lavender pt-2`}>
            <span>
                Оппонент просит перезапустить игру
            </span>

            <div className='flex justify-between px-6'>
                <button className='bg-ctp-blue/50 border-2 border-ctp-blue rounded-xl px-6 py-2 hover:bg-ctp-blue/20'
                        onClick={() => acceptRestart(true)}>
                    Начинаем сначала
                </button>
                <button className='bg-ctp-red/50 border-2 border-ctp-red rounded-xl px-6 py-2 hover:bg-ctp-red/20'
                        onClick={() => rejectRestart(false)}>
                    Доигрываем эту партию</button>
            </div>
        </div>
    );
};

export default MultiplayerRestartRequest;