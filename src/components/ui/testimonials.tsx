import { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  tourType: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      review: "An absolutely incredible experience! The tour guides were knowledgeable and friendly. Every detail was perfectly planned. I can't wait to book another trip!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      tourType: "Swiss Alps Tour"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
      review: "The Maldives package exceeded all expectations. Crystal clear waters, amazing hospitality, and unforgettable memories. Highly recommend this travel agency!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      tourType: "Maldives Beach Escape"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      rating: 5,
      review: "Safari in Tanzania was a dream come true. Seeing wildlife in their natural habitat was breathtaking. The accommodations were luxurious and the service impeccable.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      tourType: "Serengeti Safari"
    },
    {
      id: 4,
      name: "Fly Connects",
      location: "Kurunagala,Sri Lanka ",
      rating: 5,
      review: "Iceland's Northern Lights tour was magical! Professional photography guidance helped us capture stunning shots. Every moment was worth it. Thank you for this amazing adventure!",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      tourType: "Iceland Northern Lights"
    }
  ];

  const nextTestimonial = (): void => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = (): void => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-subtle"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-subtle"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            What Our <span className="text-cyan-400">Travelers Say</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Real stories from real travelers who experienced unforgettable journeys with us
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-white/20">
        

          <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8 mt-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-3 sm:border-4 border-cyan-400 shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-cyan-500 rounded-full p-1.5 sm:p-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-4xl sm:text-5xl md:text-6xl text-cyan-400 opacity-50 mb-1 sm:mb-2">"</div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed mb-4 sm:mb-5 md:mb-6 italic">
                {testimonials[activeIndex].review}
              </p>
              <div className="space-y-1">
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-sm sm:text-base text-cyan-400 font-medium">
                  {testimonials[activeIndex].location}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {testimonials[activeIndex].tourType}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-1.5 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "w-6 h-2.5 sm:w-8 sm:h-3 bg-cyan-400"
                      : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
