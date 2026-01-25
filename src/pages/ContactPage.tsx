import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { useEffect } from "react"
import AlertModal from "../components/ui/AlertModal"
import { updatePageSEO } from "../services/seoService"
import type { AlertModalConfig } from "../components/ui/AlertModal"
import fbIcon from "../assets/fb.png";
import tiktokIcon from "../assets/tiktok.png";


interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

export default function ContactPage() {
  useEffect(() => {
    updatePageSEO({
      title: "Contact FlyConnect - Get in Touch with Our Travel Experts",
      description: "Contact FlyConnect for travel inquiries, bookings, and support. Call +94 77 042 6007 or send us an email. We're here to help!",
      keywords: "contact FlyConnect, travel support, tour booking, customer service",
      url: "https://flyconnects.com/contact",
    })
  }, [])

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSending, setIsSending] = useState<boolean>(false)
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) return

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      setAlertConfig({
        title: "Email Not Configured",
        message:
          "Email sending is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.",
        type: "error",
        onConfirm: undefined,
      })
      setShowAlert(true)
      return
    }

    setIsSending(true)

    try {
      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: "",
          details: `Contact Message\nSubject: ${formData.subject}\n\n${formData.message}`,

          // Optional (configure these in EmailJS template if you want)
          from_name: formData.name,
          reply_to: formData.email,
        },
        { publicKey: emailJsPublicKey },
      )

      setAlertConfig({
        title: "Success!",
        message: "Message sent successfully. We will get back to you shortly.",
        type: "success",
        onConfirm: undefined,
      })
      setShowAlert(true)

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      })
      setErrors({})
    } catch (error: unknown) {
      console.error("Contact email send failed:", error)

      const errorText =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : JSON.stringify(error)

      setAlertConfig({
        title: "Failed",
        message: `Failed to send message right now. Please try again.\n\n${errorText}`,
        type: "error",
        onConfirm: undefined,
      })
      setShowAlert(true)
    } finally {
      setIsSending(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["No:28, Negombo Road, Kurunegala, Sri Lanka"]
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+94 77 042 6007", "+94 37 713 3535", "Mon-Fri: 9AM - 6PM"]
    },
    {
      icon: "📧",
      title: "Email Us",
      details: ["Theflyconnects@gmail.com"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <AlertModal
        open={showAlert}
        config={alertConfig}
        onClose={() => setShowAlert(false)}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            Get In <span className="text-primary-600">Touch</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{info.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-sm sm:text-base text-gray-600">{detail}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 animate-slide-in-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-5 sm:mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } focus:border-primary-500 focus:outline-none transition`}
                  placeholder="Full Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:border-primary-500 focus:outline-none transition`}
                  placeholder="email@gmail.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  } focus:border-primary-500 focus:outline-none transition`}
                  placeholder="+94 11 222 3333"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition bg-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Booking Question">Booking Question</option>
                  <option value="Tour Information">Tour Information</option>
                  <option value="Support">Support</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.message ? 'border-red-500' : 'border-gray-200'
                  } focus:border-primary-500 focus:outline-none transition resize-none`}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className={`w-full px-6 py-4 text-white font-semibold rounded-lg transform transition-all duration-300 shadow-lg ${
                  isSending
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 hover:shadow-xl hover:scale-[1.02]"
                }`}
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Map / Additional Info */}
          <div className="space-y-4 sm:space-y-6 animate-slide-in-right">
            {/* Map Placeholder */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden h-[250px] sm:h-[300px] md:h-[400px]">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63338.23!2d80.3611785!3d7.4886199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjknMTkuMCJOIDgwwrAyMSczOS4xIkU!5e0!3m2!1sen!2s!4v1647095967555!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="https://web.facebook.com/people/The-Fly-Connects/100090108482861/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                >
                  <img src={fbIcon} alt="Facebook" className="w-8 h-8" />

                </a>
                <a
                  href="https://www.tiktok.com/@theflyconnects"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                  title="TikTok"
                >
                  <img src={tiktokIcon} alt="TikTok" className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}