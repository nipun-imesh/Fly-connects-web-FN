import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: ""
        });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["123 Travel Street", "Adventure City, AC 12345"]
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri: 9AM - 6PM"]
    },
    {
      icon: "📧",
      title: "Email Us",
      details: ["info@traveltours.com", "support@traveltours.com"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
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
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 rounded">
                <p className="text-green-700 font-semibold">Thank you for contacting us!</p>
                <p className="text-green-600 text-sm">We'll get back to you shortly.</p>
              </div>
            )}

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
                  placeholder="John Doe"
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
                  placeholder="john@example.com"
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
                  placeholder="+1 (555) 123-4567"
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
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map / Additional Info */}
          <div className="space-y-4 sm:space-y-6 animate-slide-in-right">
            {/* Map Placeholder */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden h-[250px] sm:h-[300px] md:h-[400px]">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596098735!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647095967555!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Quick Answers</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="text-sm sm:text-base font-semibold mb-1">How quickly will I get a response?</h4>
                  <p className="text-xs sm:text-sm text-primary-100">We typically respond within 24 hours on business days.</p>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold mb-1">Can I call directly?</h4>
                  <p className="text-xs sm:text-sm text-primary-100">Absolutely! We're available Mon-Fri, 9AM-6PM.</p>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold mb-1">Do you offer group discounts?</h4>
                  <p className="text-xs sm:text-sm text-primary-100">Yes! Contact us for groups of 5 or more.</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex space-x-3 sm:space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base hover:from-primary-600 hover:to-primary-700 transform hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    {social[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
