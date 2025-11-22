import {useAppStore} from "../../store/appStore.ts";
import React, {useEffect, useState} from "react";
import MenuMultiplayer from "./MenuMultiplayer.tsx";
import MenuProfile from "./MenuProfile.tsx";

const Menu = () => {
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
                <MenuProfile />
                <MenuMultiplayer />
            </div>
        </div>
    );
};

export default Menu;