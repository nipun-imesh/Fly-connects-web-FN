import { useMemo, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import emailjs from "@emailjs/browser"
import Loader from "../components/ui/Loader"
import AlertModal from "../components/ui/AlertModal"
import type { AlertModalConfig } from "../components/ui/AlertModal"
import usePreloadImages from "../hooks/usePreloadImages"
import { getServiceById } from "../services/serviceData"

interface EnquiryFormData {
  name: string
  email: string
  phone: string
  date: string
  details: string
}

interface EnquiryFormErrors {
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
  const digitsOnly = raw.replace(/\D/g, "")

  // WhatsApp wa.me requires international format.
  // Sri Lanka mobiles are often entered as 07xxxxxxxx; convert to 94xxxxxxxxx.
  if (digitsOnly.length === 10 && digitsOnly.startsWith("0")) {
    return `94${digitsOnly.slice(1)}`
  }

  return digitsOnly
}

export default function OfferDetailsPage() {
  const params = useParams()
  const offerId = Number(params.offerId)

  const offer = useMemo(() => {
    if (!Number.isFinite(offerId)) return undefined
    return getServiceById(offerId)
  }, [offerId])

  const offerImages = useMemo(() => (offer?.image ? [offer.image] : []), [offer])
  const { isReady: areImagesReady } = usePreloadImages(offerImages)

  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    details: "",
  })

  const [errors, setErrors] = useState<EnquiryFormErrors>({})
  const [isSending, setIsSending] = useState<boolean>(false)
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" })
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState<AlertModalConfig>({
    title: "",
    message: "",
    type: "success",
    onConfirm: undefined,
  })

  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined

  const validateForm = (): boolean => {
    const nextErrors: EnquiryFormErrors = {}

    if (!formData.name.trim()) nextErrors.name = "Name is required"

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

    if (!formData.date.trim()) nextErrors.date = "Date is required"

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

    if (errors[name as keyof EnquiryFormErrors]) {
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
    if (!offer || !whatsappNumber) return null
    const sanitized = sanitizeWhatsappNumber(whatsappNumber)
    if (!sanitized) return null

    const dateText = formData.date || "(not provided)"
    const message = [
      "Offer Enquiry",
      `Offer: ${offer.title}`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Date: ${dateText}`,
      "Details:",
      formData.details,
    ].join("\n")

    return `https://wa.me/${sanitized}?text=${encodeURIComponent(message)}`
  }, [formData, offer, whatsappNumber])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!offer) return
    if (!validateForm()) return

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      setStatus({
        state: "error",
        message: "Email sending is not configured. Please set EmailJS environment variables.",
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
          details: `Offer: ${offer.title}\n\n${formData.details}`,
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
        message: "Failed to send enquiry right now. Please try again or use WhatsApp.",
      })
    } finally {
      setIsSending(false)
    }
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900">Offer not found</h1>
            <p className="text-gray-600 mt-2">The offer you are looking for does not exist.</p>
            <div className="mt-6">
              <Link
                to="/tours"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Back to Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!areImagesReady) {
    return <Loader label="Loading offer image..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
      <AlertModal
        open={showAlert}
        config={alertConfig}
        onClose={() => setShowAlert(false)}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between mb-5">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-600 transition"
          >
            <span aria-hidden>←</span>
            Back to Tours
          </Link>
        </div>

        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="relative h-[280px] sm:h-[360px] md:h-[420px] bg-gray-900">
            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4 bg-red-600/95 rounded-lg px-3 py-2">
              <p className="text-sm font-bold text-white">Offer</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow">
                {offer.title}
              </h1>
              <p className="text-white/90 mt-2 font-medium">What We Offer</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="mt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Offer Details</h2>
              <p className="text-gray-700 mt-3 leading-relaxed">{offer.description}</p>
            </div>

            {offer.details && offer.details.length > 0 && (
              <div className="mt-7">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Package Inclusions</h2>
                <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
                  {offer.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Enquiry</h2>
                  <p className="text-sm text-gray-600 mt-1">Send an enquiry for this offer.</p>
                </div>
                <div className="text-xl" aria-hidden>
                  {offer.icon}
                </div>
              </div>

              {status.state !== "idle" && (
                <div
                  className={`mt-4 p-3 rounded border-l-4 ${
                    status.state === "success" ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${
                      status.state === "success" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {status.message}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="offer-name">
                    Name *
                  </label>
                  <input
                    id="offer-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="offer-email">
                    Email *
                  </label>
                  <input
                    id="offer-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="offer-phone">
                    Phone *
                  </label>
                  <input
                    id="offer-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="offer-date">
                    Date *
                  </label>
                  <input
                    id="offer-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.date ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition bg-white`}
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="offer-details">
                    Details *
                  </label>
                  <textarea
                    id="offer-details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.details ? "border-red-500" : "border-gray-200"
                    } focus:border-primary-500 focus:outline-none transition resize-none`}
                    placeholder="Number of travelers, preferences, etc..."
                  />
                  {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg ${
                    isSending
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-primary-500/30"
                  }`}
                >
                  {isSending ? "Sending..." : "Send Enquiry"}
                </button>

                <a
                  href={whatsappHref ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!whatsappHref}
                  className={`inline-flex w-full items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow ${
                    whatsappHref
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (!whatsappHref) e.preventDefault()
                  }}
                >
                  WhatsApp Enquiry
                </a>

                {(!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) && (
                  <p className="text-xs text-gray-500">
                    EmailJS is not configured yet. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and
                    VITE_EMAILJS_PUBLIC_KEY.
                  </p>
                )}
                {!whatsappNumber && <p className="text-xs text-gray-500">WhatsApp number is not configured.</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
