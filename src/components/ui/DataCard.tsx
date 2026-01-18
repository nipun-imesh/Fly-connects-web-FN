import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getToursFromFirebase } from "../../services/firebaseTourService"
import type { Tour } from "../../services/tourService"

export default function DataCard() {
  const navigate = useNavigate()
  const [selectedOffer, setSelectedOffer] = useState<Tour | null>(null)
  const [offers, setOffers] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const fetchedTours = await getToursFromFirebase()
        // Filter only offers and assign IDs
        const offersOnly = fetchedTours.filter((tour: any) => tour.isOffer === true)
        const offersWithIds = offersOnly.map((offer: any, index: number) => ({
          ...offer,
          id: index + 1
        }))
        setOffers(offersWithIds)
      } catch (error) {
        console.error("Error loading offers:", error)
      } finally {
        setLoading(false)
      }
    }
    loadOffers()
  }, [])

  const handleCardClick = (offer: Tour): void => {
    navigate(`/tours/${offer.id}`)
  }

  const closeModal = (): void => {
    setSelectedOffer(null)
  }

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            What We <span className="text-red-600">Offer</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            From thrilling adventures to peaceful retreats, we provide comprehensive travel services tailored to your dreams
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="group relative rounded-xl overflow-hidden bg-white shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => handleCardClick(offer)}
              >
                <div className="absolute inset-0 rounded-xl border-2 border-red-600 transition-colors duration-300 group-hover:border-red-700"></div>

                {/* Image Section */}
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={offer.images[0]}
                    alt={offer.title}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/25 via-black/20 to-black/35"></div>

                  {/* Title Overlay */}
                  <div className="absolute top-3 left-3 right-3">
                    <div className="inline-flex max-w-full rounded-lg bg-black/55 px-3 py-2 backdrop-blur-sm">
                      <span className="truncate text-sm sm:text-base font-bold text-white">
                        {offer.title}
                      </span>
                    </div>
                  </div>

                  {/* Offer Badge */}
                  <div className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Rs {offer.price}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 md:p-6 bg-white">
                  {/* Top Line Accent */}
                  <div className="h-1 mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-red-600 to-black w-12 sm:w-16"></div>

                  {/* Location & Duration */}
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">{offer.location}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>{offer.duration}</span>
                  </div>

                  {offer.inclusions && offer.inclusions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2">
                        Package Inclusions
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {offer.inclusions.slice(0, 3).map((inclusion, idx) => (
                          <li key={idx}>{inclusion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedOffer && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-in-up relative"
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
            <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-2xl">
              <img 
                src={selectedOffer.images[0]} 
                alt={selectedOffer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/35 via-black/25 to-black/40"></div>
              
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                Rs {selectedOffer.price}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-black rounded-full mb-4"></div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedOffer.title}
              </h2>

              {/* Location & Duration */}
              <div className="flex items-center gap-4 mb-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">{selectedOffer.location}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">{selectedOffer.duration}</span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {selectedOffer.description}
                </p>

                {selectedOffer.inclusions && selectedOffer.inclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Package Inclusions</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedOffer.inclusions.map((inclusion, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-base text-gray-700">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
