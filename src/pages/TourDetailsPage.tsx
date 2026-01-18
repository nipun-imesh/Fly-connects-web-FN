import { useMemo, useState, useEffect } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import emailjs from "@emailjs/browser"
import Loader from "../components/ui/Loader"
import usePreloadImages from "../hooks/usePreloadImages"
import { getToursFromFirebase } from "../services/firebaseTourService"
import type { Tour } from "../services/tourService"

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
  return raw.replace(/\D/g, "")
}

export default function TourDetailsPage() {
  const params = useParams()
  const tourId = Number(params.tourId)

  const [tour, setTour] = useState<Tour | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTour = async () => {
      try {
        if (!Number.isFinite(tourId)) {
          setTour(undefined)
          setLoading(false)
          return
        }

        const fetchedTours = await getToursFromFirebase()
        // Assign IDs to match the URL parameter
        const toursWithIds = fetchedTours.map((t: any, index: number) => ({
          ...t,
          id: index + 1
        }))
        
        const foundTour = toursWithIds.find((t: Tour) => t.id === tourId)
        setTour(foundTour)
      } catch (error) {
        console.error("Error loading tour:", error)
        setTour(undefined)
      } finally {
        setLoading(false)
      }
    }
    loadTour()
  }, [tourId])

  const tourImages = useMemo(() => tour?.images ?? [], [tour])
  const { isReady: areImagesReady } = usePreloadImages(tourImages)

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

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
    if (!tour || !whatsappNumber) return null
    const sanitized = sanitizeWhatsappNumber(whatsappNumber)
    if (!sanitized) return null

    const message = [
      "Tour Enquiry",
      `Tour: ${tour.title}`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Date: ${formData.date || "(not provided)"}`,
      "Details:",
      formData.details,
    ].join("\n")

    return `https://wa.me/${sanitized}?text=${encodeURIComponent(message)}`
  }, [formData, tour, whatsappNumber])

  const nextImage = (): void => {
    if (!tour) return
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length)
  }

  const prevImage = (): void => {
    if (!tour) return
    setCurrentImageIndex((prev) => (prev === 0 ? tour.images.length - 1 : prev - 1))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!tour) return
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
          tour: tour.title,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          details: formData.details,
        },
        { publicKey: emailJsPublicKey },
      )

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

  if (loading) {
    return <Loader label="Loading tour details..." />
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-5">
          <Link
            to="/tours"
            className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800"
          >
            ← Back to Tours
          </Link>

          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h1 className="text-2xl font-bold text-gray-900">Tour not found</h1>
            <p className="text-gray-600 mt-2">Please go back and pick another tour.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!areImagesReady) {
    return <Loader label="Loading tour images..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <Link
          to="/tours"
          className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800"
        >
          ← Back to Tours
        </Link>

        {/* Header: slider */}
        <div className="mt-6 relative h-64 sm:h-80 md:h-[520px] bg-gray-900 overflow-hidden rounded-2xl">
          <img
            src={tour.images[currentImageIndex]}
            alt={`${tour.title} ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {tour.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 transition-all duration-200 shadow"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 transition-all duration-200 shadow"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                {currentImageIndex + 1} / {tour.images.length}
              </div>
            </>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow">
              {tour.title}
            </h1>
            <p className="text-white/90 mt-2 font-medium">{tour.location}</p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {tour.duration}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {tour.tourType}
              </span>
            </div>

            <div className="mt-5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tour Details</h2>
              <p className="text-gray-700 mt-3 leading-relaxed">
                {tour.description}
              </p>
            </div>

            <div className="mt-7">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Package Inclusions</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
                {tour.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-gray-900">Price</h2>
                <p className="text-2xl font-extrabold text-primary-700">
                  Rs {tour.price.toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">per person</p>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900">Enquiry</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Send an enquiry for this tour.
                </p>

                {status.state !== "idle" && (
                  <div
                    className={`mt-4 p-3 rounded border-l-4 ${
                      status.state === "success"
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        status.state === "success"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {status.message}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="tour-name">
                          Name *
                        </label>
                        <input
                          id="tour-name"
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="tour-email">
                          Email *
                        </label>
                        <input
                          id="tour-email"
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="tour-phone">
                          Phone *
                        </label>
                        <input
                          id="tour-phone"
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="tour-date">
                          Date *
                        </label>
                        <input
                          id="tour-date"
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="tour-details">
                          Details *
                        </label>
                        <textarea
                          id="tour-details"
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
                            ? "bg-gradient-to-r from-accent-600 to-accent-700 text-white hover:from-accent-700 hover:to-accent-800"
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
                          EmailJS is not configured yet. Set VITE_EMAILJS_SERVICE_ID,
                          VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.
                        </p>
                      )}
                      {!whatsappNumber && (
                        <p className="text-xs text-gray-500">
                          WhatsApp number is not configured.
                        </p>
                      )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
