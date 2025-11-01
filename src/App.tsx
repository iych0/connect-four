import GameField from "./components/GameField.tsx";

function App() {
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

export default App