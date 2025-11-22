import Header from "./Header.tsx";
import Menu from "./Menu/Menu.tsx";
import GameField from "./GameField/GameField.tsx";

const LocalGameLayout = () => {
    return (
        <div className='flex flex-col w-full h-full items-center justify-around bg-ctp-base text-ctp-text'>
            <Header />
            <Menu />
            <GameField />
        </div>
    );
};

export default LocalGameLayout;