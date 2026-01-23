import { useState } from "react"
import type { FormEvent } from "react"
import AlertModal, { type AlertModalConfig } from "../components/ui/AlertModal"
import { changeAdminPassword } from "../services/adminAuth"

interface FormState {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export default function AdminChangePasswordPage() {
  const [form, setForm] = useState<FormState>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertConfig, setAlertConfig] = useState<AlertModalConfig>({
    title: "",
    message: "",
    type: "success",
  })

  const openError = (message: string) => {
    setAlertConfig({
      title: "Password Change Failed",
      message,
      type: "error",
    })
    setAlertOpen(true)
  }

  const openSuccess = (message: string) => {
    setAlertConfig({
      title: "Password Updated",
      message,
      type: "success",
    })
    setAlertOpen(true)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.currentPassword || !form.newPassword || !form.confirmNewPassword) {
      openError("Please fill all fields.")
      return
    }

    if (form.newPassword.length < 6) {
      openError("New password must be at least 6 characters.")
      return
    }

    if (form.newPassword !== form.confirmNewPassword) {
      openError("New passwords do not match.")
      return
    }

    if (form.currentPassword === form.newPassword) {
      openError("New password must be different from current password.")
      return
    }

    setIsLoading(true)

    const result = await changeAdminPassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    })

    setIsLoading(false)

    if (!result.success) {
      openError(result.error || "Password update failed.")
      return
    }

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    })
    openSuccess("Your admin password has been updated successfully.")
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-3xl font-extrabold mb-2">
          <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
            Change Password
          </span>
        </h1>
        <p className="text-gray-600 mb-8">Update your admin account password</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                }
                disabled={isLoading}
                required
                className="w-full pr-12 px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((v) => !v)}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                disabled={isLoading}
                required
                className="w-full pr-12 px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((v) => !v)}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={form.confirmNewPassword}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  confirmNewPassword: e.target.value,
                }))
              }
              disabled={isLoading}
              required
              className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Re-enter new password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      <AlertModal
        open={alertOpen}
        config={alertConfig}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  )
}
