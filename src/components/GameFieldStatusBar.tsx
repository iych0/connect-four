import type {Player} from "../types.ts";

const GameFieldStatusBar = ({player}: {player: Omit<Player, "id">}) => {
    return (
        <div className='text-3xl transform transition-all duration-200'>
            <span>Сейчас ходит </span>
            <span className={`text-ctp-${player.color}`}>
                        {player.name || player.defaultName}
                    </span>
        </div>
    );
};

export default GameFieldStatusBar;