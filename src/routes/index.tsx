import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "../pages/HomePage"
import ToursPage from "../pages/ToursPage"
import AboutPage from "../pages/AboutPage"
import ContactPage from "../pages/ContactPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tours" element={<ToursPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
