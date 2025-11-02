import GameField from "./components/GameField.tsx";
import {useEffect, useEffectEvent} from "react";

function App() {
    // new fancy hooks (why not?)
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
    <div className='flex flex-col w-full h-full items-center justify-center bg-ctp-base text-ctp-text'>
        {/*Potentially a great header*/}
        <></>

        {/*Game window*/}
        <GameField />

        {/*Potentially a great footer*/}
        <></>
    </div>
  )
}

export default App;