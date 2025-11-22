// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Menu from "../../assets/menu.svg?react"
import {useShallow} from "zustand/react/shallow";
import {useAppStore} from "../../store/appStore.ts";
import {useGameStore} from "../../store/gameStore.ts";

const MultiplayerHeader = () => {
    const showMenu = useAppStore((state) => state.showMenu);

    return (
        <div className='flex flex-row justify-between w-full px-6 items-center'>
            <div className="h-12 w-12"></div>
            <Scoreboard />
            <div className={`flex relative h-12 w-12 justify-center items-center rounded-full transition duration-200
            hover:bg-ctp-surface1 after:content-['Меню'] after:opacity-0 hover:after:opacity-100
            after:transition-opacity after:duration-100
            after:absolute after:right-4 after:top-14 after:text-nowrap after:text-xl`}
                 onClick={showMenu}>
                <Menu className='h-10 w-10'/>
            </div>
        </div>
    );
};

const Scoreboard = () => {
    const { players } = useGameStore(
        useShallow((state) => ({
            players: state.players,
        }))
    );

    return (
        <div className="flex gap-4 text-5xl">
            <span className={`text-ctp-${players[0].color}`}>{players[0].winsCount}</span>
            <span>:</span>
            <span className={`text-ctp-${players[1].color}`}>{players[1].winsCount}</span>
        </div>
    )
}

export default MultiplayerHeader;