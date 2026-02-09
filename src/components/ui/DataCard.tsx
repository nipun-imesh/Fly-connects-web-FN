import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getToursFromFirebase } from "../../services/firebaseTourService"
import type { Tour } from "../../services/tourService"

export default function DataCard() {
  const navigate = useNavigate()
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
        setOffers(offersWithIds.slice(0, 4))
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
                    {offer.currency || "Rs"} {offer.price}
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
    </div>
  )
}
