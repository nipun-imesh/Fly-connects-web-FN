import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  guests: number;
  specialRequests: string;
}

export default function BookingPage() {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    guests: 1,
    specialRequests: ""
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Mock tour data - in real app, fetch based on tourId
  const tour = {
    id: tourId,
    title: "Mountain Paradise",
    location: "Swiss Alps",
    price: 2499,
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: name === 'guests' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsSubmitted(true);
    
    setTimeout(() => {
      navigate('/tours');
    }, 3000);
  };

  const getTotalPrice = (): number => {
    return tour.price * bookingData.guests;
  };

  const getMinDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 sm:px-5">
        <div className="max-w-md w-full bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Booking Confirmed!</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
            Thank you for booking with us! We've sent a confirmation email to {bookingData.email}
          </p>
          <div className="bg-primary-50 rounded-lg p-3 sm:p-4 mb-5 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold">Tour:</span> {tour.title}
            </p>
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold">Guests:</span> {bookingData.guests}
            </p>
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold">Total:</span> ${getTotalPrice().toLocaleString()}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Redirecting to tours page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Book Your <span className="text-primary-600">Adventure</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Complete the form below to reserve your spot</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 animate-slide-in-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6">Booking Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={bookingData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travel Details */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Travel Details</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                          Preferred Start Date *
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={bookingData.startDate}
                          onChange={handleChange}
                          min={getMinDate()}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Guests *
                        </label>
                        <select
                          id="guests"
                          name="guests"
                          value={bookingData.guests}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition resize-none"
                        placeholder="Dietary restrictions, accessibility needs, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div>
                  <div className="flex items-start mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                      I agree to the terms and conditions, cancellation policy, and privacy policy *
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 lg:sticky lg:top-24 animate-slide-in-right">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Booking Summary</h2>
              
              {/* Tour Image */}
              <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white">
                  <h3 className="text-base sm:text-lg font-bold">{tour.title}</h3>
                  <p className="text-xs sm:text-sm">{tour.location}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-800">{tour.duration}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Price per person:</span>
                  <span className="font-semibold text-gray-800">${tour.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Number of guests:</span>
                  <span className="font-semibold text-gray-800">{bookingData.guests}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 sm:pt-3 flex justify-between items-center">
                  <span className="font-bold text-sm sm:text-base text-gray-800">Total:</span>
                  <span className="font-bold text-xl sm:text-2xl text-primary-600">${getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              {/* Features */}
              <div className="bg-primary-50 rounded-lg p-3 sm:p-4 space-y-2">
                <h4 className="font-semibold text-gray-800 mb-2 text-xs sm:text-sm">What's Included:</h4>
                {[
                  "Professional guide",
                  "Accommodation",
                  "Meals as specified",
                  "Transportation",
                  "Travel insurance"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-200">
                <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                  Need help? Call us at <br />
                  <span className="font-semibold text-primary-600 text-xs sm:text-sm">+1 (555) 123-4567</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
