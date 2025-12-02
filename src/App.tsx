import { BrowserRouter as Router, useLocation } from "react-router-dom"
import NavBar from "./components/ui/NavBar"
import Footer from "./components/ui/footer"
import AppRoutes from "./routes"

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <NavBar />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
