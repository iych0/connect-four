import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes } from 'react-router'
import App from "./App.tsx";
import LocalGameLayout from "./components/LocalGameLayout.tsx";
import MultiplayerGameLayout from "./components/Multiplayer/MultiplayerGameLayout.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route index element={<LocalGameLayout />} />
                  <Route path="room/:roomId" element={<MultiplayerGameLayout />} />

                  <Route path="*" element={<div>404 page (wip)</div>} />
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
