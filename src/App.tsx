import GameField from "./components/GameField.tsx";
import {useEffect, useEffectEvent} from "react";
import Header from "./components/Header.tsx";
import {useGameLogic} from "./hooks/useGameLogic.ts";
import {GameContext} from "./core/GameContext.ts";
import "../hollow-shadow.css"

function App() {
    // new fancy hooks
    const handleBeforeUnload = useEffectEvent((event: BeforeUnloadEvent) => {
        event.preventDefault();
        return '';
    })

    const {
        gameSeed,
        players,
        items,
        gameState,
        currentPlayer,
        fieldHeight,
        fieldWidth,
        currentPlayerIndex,
        updateItems,
        changePlayer,
        updatePlayer,
        restartGame,
        updateState,
    } = useGameLogic();

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

  return (
      <GameContext value={{...currentPlayer,
          gameSeed,
          players,
          gameField: items,
          gameState,
          fieldHeight,
          fieldWidth,
          currentPlayerIndex,
          changePlayer,
          updateItems,
          updatePlayer,
          updateState,
          restartGame}}>
              <div className='flex flex-col w-full h-full items-center justify-around bg-ctp-base text-ctp-text'>
                  <Header />

                  {/*Game window*/}
                  <GameField />

                  {/*Potentially a great footer*/}
                  <></>
              </div>
          </GameContext>
  )
}

export default App;