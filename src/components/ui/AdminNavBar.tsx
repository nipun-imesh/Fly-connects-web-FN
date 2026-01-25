import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { logoutAdmin } from "../../services/adminAuth"

export default function AdminNavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async (): Promise<void> => {
    await logoutAdmin()
    navigate("/admin/login")
    setIsOpen(false)
  }

  const isActive = (path: string): boolean => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white border-b-2 border-gray-200 shadow-sm relative z-20">
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-200 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200">
            <span className="text-lg font-bold text-gray-800">
              Admin <span className="text-primary-600">Panel</span>
            </span>
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-4 px-5 py-6 text-sm font-semibold text-gray-800">
            <Link
              to="/admin/offers"
              onClick={() => setIsOpen(false)}
              className={`transition-colors ${
                isActive("/admin/offers")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              What We Offer
            </Link>
            <Link
              to="/admin/tours"
              onClick={() => setIsOpen(false)}
              className={`transition-colors ${
                isActive("/admin/tours")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              Tours
            </Link>
            <Link
              to="/admin/register"
              onClick={() => setIsOpen(false)}
              className={`transition-colors ${
                isActive("/admin/register")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              Register Admin
            </Link>
            <Link
              to="/admin/change-password"
              onClick={() => setIsOpen(false)}
              className={`transition-colors ${
                isActive("/admin/change-password")
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
