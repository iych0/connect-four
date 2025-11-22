import React, {useEffect, useState} from "react";

const MenuMultiplayer = () => {
    const [roomId, setRoomId] = useState('');
    const [isCopyMsgShown, setIsCopyMsgShown] = useState(false);
    const [inviteRoomId, setInviteRoomId] = useState('');

    const handleCopy = () => {
        if (!roomId) return;

        navigator.clipboard.writeText(roomId);
        setIsCopyMsgShown(true);
        setTimeout(() => {
            setIsCopyMsgShown(false);
        }, 2000);
    };

    const handleRoomIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInviteRoomId(e.currentTarget.value);
    }

    useEffect(() => {
        const id = crypto.randomUUID();
        setRoomId(id);
    }, [])

    return (
        <div className='flex flex-col gap-4'>
            <span className='text-3xl'>Мультиплеер</span>

            <div className="flex flex-col gap-2 w-full items-center border-b-2 border-t-2 rounded-2xl border-ctp-lavender/20 py-6">
                <span className=''>Создайте лобби и отправьте ID комнаты другу</span>
                <span className='text-ctp-text/50'>Кликните на ID, чтобы скопировать в буфер обмена</span>
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
                <button className='bg-ctp-surface1 border-2 border-ctp-lavender rounded-xl px-6 py-2 hover:bg-ctp-surface0'>
                    Создать лобби
                </button>
            </div>
            <div className='flex flex-col gap-2 w-full items-center border-b-2 border-t-2 rounded-2xl border-ctp-lavender/20 py-6'>
                <span>...или присоединитесь по ID</span>


                <input type='text'
                       placeholder='ID комнаты'
                       onChange={handleRoomIdInput}
                       className='transition-all duration-100 hover:bg-ctp-surface1 focus:bg-ctp-surface1 mb-6
                       border-b-2 border-ctp-lavender opacity-50 max-w-96 w-full'/>

                <button className={`bg-ctp-surface1 border-2 border-ctp-lavender rounded-xl px-6 py-2 transform duration-200
                                    ${inviteRoomId === "" ? "opacity-50" : "opacity-100 hover:bg-ctp-surface0"}`}>
                    {inviteRoomId === "" ? "Сперва заполните ID" : "Присоединиться"}
                </button>
            </div>
        </div>
    );
};

export default MenuMultiplayer;