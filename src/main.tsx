import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { getFirebaseAnalytics } from "./services/firebase"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Optional: initialize Firebase Analytics when configured/supported
void getFirebaseAnalytics()
