import GameField from "./components/GameField.tsx";
import {useEffect, useEffectEvent} from "react";
import Header from "./components/Header.tsx";
import "../hollow-shadow.css"
import Menu from "./components/Menu.tsx";

function App() {
    // new fancy hooks
    const handleBeforeUnload = useEffectEvent((event: BeforeUnloadEvent) => {
        event.preventDefault();
        return '';
    })

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

  return (
      <div className='flex flex-col w-full h-full items-center justify-around bg-ctp-base text-ctp-text'>
          <Header />
          <Menu />

          {/*Game window*/}
          <GameField />

          {/*Potentially a great footer*/}
          <></>
      </div>
  )
}

export default App;