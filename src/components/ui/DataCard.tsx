import { useState, useRef, useEffect } from "react"
import { getAllServices } from "../../services/serviceData"
import type { Service } from "../../services/serviceData"

export default function DataCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [truncatedStates, setTruncatedStates] = useState<boolean[]>([])
  const [services, setServices] = useState<Service[]>([])
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    setServices(getAllServices())
  }, [])

  useEffect(() => {
    const newTruncatedStates = descriptionRefs.current.map((ref) => {
      if (!ref) return false;
      return ref.scrollHeight > ref.clientHeight;
    });
    setTruncatedStates(newTruncatedStates);
  }, []);

  const handleCardClick = (service: Service): void => {
    setSelectedService(service);
  };

  const closeModal = (): void => {
    setSelectedService(null)
  }

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            What We <span className="text-cyan-500">Offer</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            From thrilling adventures to peaceful retreats, we provide comprehensive travel services tailored to your dreams
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-xl overflow-hidden transition-all duration-700 transform hover:scale-105 cursor-pointer ${
                hoveredIndex === index ? "bg-white shadow-2xl shadow-blue-500/50" : "bg-white shadow-xl hover:shadow-2xl"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(service)}
            >
              {/* Border Effect */}
              <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}>
                <div className="absolute inset-0 rounded-xl border-2 border-blue-500 animate-pulse"></div>
              </div>
              
              {/* Subtle Border Before Hover */}
              <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-500 ${
                hoveredIndex === index ? "opacity-0 border-transparent" : "opacity-100 border-cyan-500"
              }`}></div>

              {/* Image Section */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredIndex === index ? "scale-125 grayscale" : "scale-100 grayscale-0"
                  }`}
                  src={service.image}
                  alt={service.title}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  hoveredIndex === index ? "bg-gradient-to-br from-blue-500/40 via-cyan-500/40 to-blue-600/40" : "bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-blue-600/30"
                }`}></div>

                {/* Animated Blue Lines */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse"></div>
                </div>

                {/* Corner Accents */}
                <div className={`absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-blue-400 transition-all duration-500 ${
                  hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}></div>
                <div className={`absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-blue-400 transition-all duration-500 ${
                  hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}></div>
              </div>

              {/* Content Section */}
              <div className={`p-4 sm:p-5 md:p-6 transition-all duration-500 ${
                hoveredIndex === index ? "bg-gradient-to-br from-blue-50 to-cyan-50" : "bg-white"
              }`}>
                {/* Top Line Accent */}
                <div className={`h-1 mb-3 sm:mb-4 rounded-full transition-all duration-500 ${
                  hoveredIndex === index ? "bg-blue-500 w-full" : "bg-gradient-to-r from-cyan-500 to-blue-600 w-12 sm:w-16"
                }`}></div>

                {/* Title */}
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 transition-all duration-500 ${
                  hoveredIndex === index ? "text-blue-600" : "text-gray-800"
                }`}>
                  {service.title}
                </h3>

                {/* Description */}
                <div className="relative">
                  <p 
                    ref={(el) => {
                      descriptionRefs.current[index] = el;
                    }}
                    className={`text-sm sm:text-base leading-relaxed transition-all duration-500 line-clamp-2 ${
                      hoveredIndex === index ? "text-gray-700" : "text-gray-600"
                    }`}
                  >
                    {service.description}
                  </p>
                  {truncatedStates[index] && (
                    <span className="text-sm sm:text-base text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer">
                      See more...
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Blue Strip */}
              <div className={`h-1 bg-blue-500 transition-all duration-500 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-in-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (X) */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              aria-label="Close modal"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header with Image */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img 
                src={selectedService.image} 
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-blue-500/40 to-blue-600/40"></div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-4"></div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedService.title}
              </h2>
              
              <p className="text-base text-gray-700 leading-relaxed">
                {selectedService.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
