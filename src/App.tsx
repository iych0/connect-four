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
    <div className='flex flex-col w-full h-full items-center justify-around bg-ctp-base text-ctp-text'>
        {/*Potentially a great header*/}
        <></>

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
        </div>


        {/*Game window*/}
        <GameField />

        {/*Potentially a great footer*/}
        <></>
    </div>
  )
}

export default App;