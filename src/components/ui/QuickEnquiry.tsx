import { useMemo, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import emailjs from "@emailjs/browser"
import AlertModal from "./AlertModal"
import type { AlertModalConfig } from "./AlertModal"

interface QuickEnquiryFormData {
  name: string
  email: string
  phone: string
  date: string
  details: string
}

interface QuickEnquiryFormErrors {
  name?: string
  email?: string
  phone?: string
  date?: string
  details?: string
}

type SubmitStatus =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "error"; message: string }

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const isValidPhone = (phone: string): boolean => {
  return /^\+?[\d\s-()]{10,}$/.test(phone)
}

const sanitizeWhatsappNumber = (raw: string): string => {
  return raw.replace(/\D/g, "")
}

const buildWhatsappMessage = (data: QuickEnquiryFormData): string => {
  const dateText = data.date || "(not provided)"

  return [
    "Quick Enquiry",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Date: ${dateText}`,
    "Details:",
    data.details,
  ].join("\n")
}

const buildWhatsappHref = (whatsappNumber: string, message: string): string => {
  const sanitized = sanitizeWhatsappNumber(whatsappNumber)
  return `https://wa.me/${sanitized}?text=${encodeURIComponent(message)}`
}

export default function QuickEnquiry() {
  const [formData, setFormData] = useState<QuickEnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    details: "",
  })

  const [errors, setErrors] = useState<QuickEnquiryFormErrors>({})
  const [isSending, setIsSending] = useState<boolean>(false)
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" })
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState<AlertModalConfig>({
    title: "",
    message: "",
    type: "success",
    onConfirm: undefined,
  })

  const isSent = status.state === "success"

  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined

  const validateForm = (): boolean => {
    const nextErrors: QuickEnquiryFormErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required"
    } else if (!isValidEmail(formData.email)) {
      nextErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required"
    } else if (!isValidPhone(formData.phone)) {
      nextErrors.phone = "Invalid phone number"
    }

    if (!formData.date.trim()) {
      nextErrors.date = "Date is required"
    }

    if (!formData.details.trim()) {
      nextErrors.details = "Details are required"
    } else if (formData.details.trim().length < 10) {
      nextErrors.details = "Details must be at least 10 characters"
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof QuickEnquiryFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }

    if (status.state !== "idle") {
      setStatus({ state: "idle" })
    }
  }

  const whatsappHref = useMemo(() => {
    if (!whatsappNumber) return null

    const message = buildWhatsappMessage(formData)
    const sanitized = sanitizeWhatsappNumber(whatsappNumber)

    if (!sanitized) return null

    return buildWhatsappHref(whatsappNumber, message)
  }, [formData, whatsappNumber])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) return

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      setStatus({
        state: "error",
        message:
          "Email sending is not configured. Please set EmailJS environment variables.",
      })
      return
    }

    setIsSending(true)
    setStatus({ state: "idle" })

    try {
      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          details: formData.details,
        },
        {
          publicKey: emailJsPublicKey,
        },
      )

      setAlertConfig({
        title: "Success!",
        message: "Enquiry sent successfully.",
        type: "success",
        onConfirm: undefined,
      })
      setShowAlert(true)

      setStatus({
        state: "success",
        message: "Enquiry sent successfully. We will get back to you shortly.",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        details: "",
      })
      setErrors({})
    } catch {
      setStatus({
        state: "error",
        message:
          "Failed to send enquiry right now. Please try again or use WhatsApp.",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 sm:py-16">
      <AlertModal
        open={showAlert}
        config={alertConfig}
        onClose={() => setShowAlert(false)}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Quick <span className="text-primary-600">Enquiry</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl">
              Send us your travel request and we’ll respond with the best options.
              You can also message us directly on WhatsApp.
            </p>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                Prefer WhatsApp?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-5">
                Tap below to send your enquiry with the same details.
              </p>

              <a
                href={whatsappHref ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!whatsappHref}
                className={`inline-flex w-full items-center justify-center px-6 py-4 font-semibold rounded-lg transition-all duration-300 shadow-lg ${
                  whatsappHref
                    ? "bg-gradient-to-r from-accent-600 to-accent-700 text-white hover:from-accent-700 hover:to-accent-800 hover:shadow-accent-500/40"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                onClick={(e) => {
                  if (!whatsappHref) e.preventDefault()
                }}
              >
                Message on WhatsApp
              </a>

              {!whatsappNumber && (
                <p className="text-xs text-gray-500 mt-3">
                  WhatsApp number is not configured.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 animate-slide-in-right">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-5 sm:mb-6">
              Enquiry Form
            </h3>

            {status.state !== "idle" && (
              <div
                className={`mb-6 p-4 rounded border-l-4 ${
                  status.state === "success"
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                }`}
              >
                <p
                  className={`font-semibold ${
                    status.state === "success" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {status.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    id="enquiry-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone *
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-date"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Date *
                  </label>
                  <input
                    id="enquiry-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.date ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition bg-white`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-details"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Details *
                </label>
                <textarea
                  id="enquiry-details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.details ? "border-red-500" : "border-gray-200"
                  } focus:border-primary-500 focus:outline-none transition resize-none`}
                  placeholder="Destination, number of travelers, budget, etc..."
                />
                {errors.details && (
                  <p className="text-red-500 text-sm mt-1">{errors.details}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending || isSent}
                className={`w-full px-6 py-4 font-semibold rounded-lg transition-all duration-300 shadow-lg ${
                  isSending
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : isSent
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 hover:shadow-xl"
                }`}
              >
                {isSending ? "Sending..." : isSent ? "Sent" : "Send Enquiry"}
              </button>

              {(!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) && (
                <p className="text-xs text-gray-500">
                  EmailJS is not configured yet. Set VITE_EMAILJS_SERVICE_ID,
                  VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
