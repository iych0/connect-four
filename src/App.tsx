import { Outlet } from 'react-router';
import {useEffect, useEffectEvent} from "react";
import "../hollow-shadow.css"
import {useMultiplayerStore} from "./store/multiplayerStore.ts";

function App() {
    // new fancy hooks
    const disconnect = useMultiplayerStore(state => state.disconnect);
    const handleBeforeUnload = useEffectEvent((event: BeforeUnloadEvent) => {
        event.preventDefault();
        return '';
    })

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            disconnect();
        };
    }, []);

  return (
      <div className='flex flex-col w-full h-full items-center justify-around bg-ctp-base text-ctp-text'>
          <Outlet />
      </div>
  )
}

export default App;