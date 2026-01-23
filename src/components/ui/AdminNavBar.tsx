import { Link, useLocation, useNavigate } from "react-router-dom"
import { logoutAdmin } from "../../services/adminAuth"

export default function AdminNavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async (): Promise<void> => {
    await logoutAdmin()
    navigate("/admin/login")
  }

  const isActive = (path: string): boolean => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-800">
                Admin <span className="text-primary-600">Panel</span>
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/admin/offers"
              className={`text-sm font-semibold transition-colors ${
                isActive("/admin/offers")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              What We Offer
            </Link>
            <Link
              to="/admin/tours"
              className={`text-sm font-semibold transition-colors ${
                isActive("/admin/tours")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              Tours
            </Link>
            <Link
              to="/admin/register"
              className={`text-sm font-semibold transition-colors ${
                isActive("/admin/register")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              Register Admin
            </Link>
            <Link
              to="/admin/change-password"
              className={`text-sm font-semibold transition-colors ${
                isActive("/admin/change-password")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
