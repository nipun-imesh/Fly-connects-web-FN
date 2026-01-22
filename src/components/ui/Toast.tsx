import type { ReactNode } from "react"

type ToastVariant = "success" | "error"

interface ToastProps {
  open: boolean
  message: ReactNode
  variant?: ToastVariant
  onClose: () => void
}

export default function Toast({
  open,
  message,
  variant = "success",
  onClose,
}: ToastProps) {
  if (!open) return null

  const styles =
    variant === "success"
      ? {
          container: "border-green-500",
          text: "text-green-800",
        }
      : {
          container: "border-red-500",
          text: "text-red-800",
        }

  return (
    <div
      className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`bg-white border border-gray-200 border-l-4 ${styles.container} rounded-xl shadow-lg px-4 py-3 flex items-start gap-3`}
        role="status"
      >
        <div className={`text-sm font-semibold ${styles.text} flex-1`}>{message}</div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
