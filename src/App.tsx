import { BrowserRouter as Router } from "react-router-dom"
import NavBar from "./components/ui/NavBar"
import Footer from "./components/ui/footer"
import AppRoutes from "./routes"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}
