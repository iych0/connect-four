import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App.tsx";
import {lazy} from "react";
import LocalGameLayout from "./components/LocalGameLayout.tsx";

const GameRouter = () => {
    const MultiplayerGameLayout = lazy(() => import("./components/Multiplayer/MultiplayerGameLayout"));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/connect-four/" element={<App />}>
                    <Route index element={<LocalGameLayout />} />
                    <Route path="room/:roomId" element={<MultiplayerGameLayout />} />

                    <Route path="*" element={<div>404!</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default GameRouter;