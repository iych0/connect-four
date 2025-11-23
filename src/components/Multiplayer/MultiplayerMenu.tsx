import {useAppStore} from "../../store/appStore.ts";
import React, {useEffect, useState} from "react";
import {useMultiplayerStore} from "../../store/multiplayerStore.ts";
import {useNavigate} from "react-router";

const MultiplayerMenu = () => {
    const isMenuShown = useAppStore(state => state.isMenuShown);
    const hideMenu = useAppStore(state => state.hideMenu);
    const disconnect = useMultiplayerStore(state => state.disconnect);
    const requestRestart = useMultiplayerStore(state => state.requestRestart);
    const navigate = useNavigate();

    const [isClosing, setIsClosing] = useState(false);

    const closeByClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            setIsClosing(true);
            setTimeout(hideMenu, 200)
        }
    }

    const returnToLocalMode = () => {
        disconnect();
        navigate('/')
    }

    const handleRestartRequest = () => {
        requestRestart();
    }

    useEffect(() => {
        return () => setIsClosing(false);
    }, [isMenuShown]);

    if (!isMenuShown) return null;

    return (
        <div className='fixed w-full h-full transition duration-200 bg-black/50 z-50 select-none' onClick={closeByClick}>
            <div className={`${isClosing? 'animate-slide-right' : 'animate-slide-left'}
            absolute inset-y-0 right-0 w-[30%] h-full bg-ctp-base px-6 py-10
            flex flex-col gap-10`}>
                <MultiplayerMenuRoom />

                <button className='bg-ctp-surface1 border-2 border-ctp-lavender rounded-xl px-6 py-2 hover:bg-ctp-surface0'
                        onClick={handleRestartRequest}>
                    Запросить перезапуск
                </button>

                <button className='bg-ctp-surface1 border-2 border-ctp-lavender rounded-xl px-6 py-2 hover:bg-ctp-surface0'
                        onClick={returnToLocalMode}>
                    Вернуться в локальный режим
                </button>

            </div>
        </div>
    );
};

const MultiplayerMenuRoom = () => {
    const roomId = useMultiplayerStore(state => state.roomId);
    const isConnected = useMultiplayerStore(state => state.isConnected);
    const [isCopyMsgShown, setIsCopyMsgShown] = useState(false);

    const handleCopy = () => {
        setIsCopyMsgShown(true);
        setTimeout(() => {
            setIsCopyMsgShown(false);
        }, 2000);
        if (roomId) {
            navigator.clipboard.writeText(roomId);
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
                <span className='text-3xl'>Комната</span>
                <span className={`text-xl opacity-70 ${isConnected ? 'text-ctp-green' : 'text-ctp-red'}`}>
                    {isConnected ? "подключено" : "нет соединения"}
                </span>
            </div>

            <div className="flex flex-col gap-2 w-full items-center border-b-2 border-t-2 rounded-2xl border-ctp-lavender/20 py-6">
                <MultiplayerMenuRoomPlayers />

                <span>ID комнаты</span>
                <div className='flex flex-col items-center relative mb-6'>
                    <span className='bg-ctp-surface1/70 hover:bg-ctp-surface1 active:scale-95 cursor-pointer transition duration-200 rounded-xl px-2 select-none'
                          title="Нажми, чтобы скопировать"
                          onClick={handleCopy}>
                            {roomId ? roomId : "Сдается место для ID комнаты"}
                    </span>
                    <span className={`absolute mt-1 top-full whitespace-nowrap text-ctp-blue transition-all duration-300 ease-in-out
                                ${isCopyMsgShown ? 'animate-slide-up' : 'pointer-events-none animate-slide-down-hide'}`}>
                        {isConnected ? "Код скопирован" : "Заглушка не скопирована"}
                    </span>
                </div>
            </div>
        </div>
    )
}

const MultiplayerMenuRoomPlayers = () => {
    const isOpponentConnected = useMultiplayerStore(state => state.isOpponentConnected);
    const isConnected = useMultiplayerStore(state => state.isConnected);

    return (
        <div className='flex w-full justify-between font-medium px-10'>
            <span className={`${isConnected ? 'text-ctp-lavender' : 'text-ctp-red'}`}>
                {isConnected ? "Мы подключены" : "Мы не подключены"}
            </span>
            <span className={`${isOpponentConnected ? 'text-ctp-lavender' : 'text-ctp-red'}`}>
                {isOpponentConnected ? "Оппонент подключен" : "Оппонент не подключен"}
            </span>
        </div>
    )
}

export default MultiplayerMenu;