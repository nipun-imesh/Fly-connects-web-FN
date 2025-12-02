import { Navigate, Outlet } from "react-router-dom"
import AdminNavBar from "../components/ui/AdminNavBar"

export default function AdminLayout() {
  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true"

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />
      <main className="py-8">
        <Outlet />
      </main>
    </div>
  )
}
