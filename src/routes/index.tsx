import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "../pages/HomePage"
import ToursPage from "../pages/ToursPage"
import AboutPage from "../pages/AboutPage"
import ContactPage from "../pages/ContactPage"
import AdminLoginPage from "../pages/AdminLoginPage"
import AdminLayout from "../pages/AdminLayout"
import AdminOffersPage from "../pages/AdminOffersPage"
import AdminToursPage from "../pages/AdminToursPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tours" element={<ToursPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/offers" replace />} />
        <Route path="offers" element={<AdminOffersPage />} />
        <Route path="tours" element={<AdminToursPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
