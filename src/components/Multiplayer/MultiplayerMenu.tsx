import {useAppStore} from "../../store/appStore.ts";
import React, {useEffect, useState} from "react";
import {useMultiplayerStore} from "../../store/multiplayerStore.ts";

const MultiplayerMenu = () => {
    const isMenuShown = useAppStore(state => state.isMenuShown);
    const hideMenu = useAppStore(state => state.hideMenu);

    const [isClosing, setIsClosing] = useState(false);

    const closeByClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            setIsClosing(true);
            setTimeout(hideMenu, 200)
        }
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
            </div>
        </div>
    );
};

const MultiplayerMenuRoom = () => {
    const roomId = useMultiplayerStore(state => state.roomId);
    const [isCopyMsgShown, setIsCopyMsgShown] = useState(false);

    const handleCopy = () => {
        if (!roomId) return;

        navigator.clipboard.writeText(roomId);
        setIsCopyMsgShown(true);
        setTimeout(() => {
            setIsCopyMsgShown(false);
        }, 2000);
    };

    return (
        <div className='flex flex-col gap-4'>
            <span className='text-3xl'>Комната</span>

            <div className="flex flex-col gap-2 w-full items-center border-b-2 border-t-2 rounded-2xl border-ctp-lavender/20 py-6">
                <span>ID комнаты</span>
                <div className='flex flex-col items-center relative mb-6'>
                    <span className='bg-ctp-surface1/70 hover:bg-ctp-surface1 active:scale-95 cursor-pointer transition duration-200 rounded-xl px-2 select-none'
                          title="Нажми, чтобы скопировать"
                          onClick={handleCopy}>
                            {roomId}
                    </span>
                    <span className={`absolute mt-1 top-full whitespace-nowrap text-ctp-blue transition-all duration-300 ease-in-out
                                ${isCopyMsgShown ? 'animate-slide-up' : 'pointer-events-none animate-slide-down-hide'}`}>
                        Код скопирован
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MultiplayerMenu;