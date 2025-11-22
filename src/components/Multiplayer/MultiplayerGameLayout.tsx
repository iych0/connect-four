import GameField from "../GameField/GameField.tsx";
import MultiplayerHeader from "./MultiplayerHeader.tsx";
import MultiplayerMenu from "./MultiplayerMenu.tsx";

const MultiplayerGameLayout = () => {
    return (
        <div className='flex flex-col w-full h-full items-center justify-around bg-ctp-base text-ctp-text'>
            <MultiplayerHeader />
            <MultiplayerMenu />
            <GameField />
        </div>
    );
};

export default MultiplayerGameLayout;