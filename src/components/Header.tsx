import {useGameLogic} from "../hooks/useGameLogic.ts";

const Header = () => {
    const { restartGame } = useGameLogic();

    const handleClick = () => {
        console.log('click')
        restartGame();
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-xl'>
                <span>This is an </span>
                <span className='text-ctp-red-100'>debug </span>
                <span>build</span>
            </div>
            <div>
                <span>Please report about any nasty bug activity to </span>
                <a href={"https://t.me/iych0"}><span>@iycho</span></a>
            </div>

            <div onClick={handleClick}>funky button</div>
        </div>
    );
};

export default Header;