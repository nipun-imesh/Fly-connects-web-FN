import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    
    // Simple authentication (in production, use proper backend authentication)
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true")
      navigate("/admin/offers")
    } else {
      setError("Invalid credentials")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials: admin / admin123</p>
        </div>
      </div>
    </div>
  )
}
