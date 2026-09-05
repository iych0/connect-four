import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GameRouter from "./router.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GameRouter />
  </StrictMode>
)
