import { useState, useEffect } from "react"
import { getAllTours } from "../../services/tourService"
import type { Tour } from "../../services/tourService"

export default function ToursGrid() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  useEffect(() => {
    const fetchTours = (): void => {
      try {
        const data = getAllTours()
        setTours(data)
      } catch (error) {
        console.error("Error fetching tours:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  const openModal = (tour: Tour): void => {
    setSelectedTour(tour)
    setCurrentImageIndex(0)
    document.body.style.overflow = "hidden"
  }

  const closeModal = (): void => {
    setSelectedTour(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

  const nextImage = (): void => {
    if (selectedTour) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedTour.images.length)
    }
  }

  const prevImage = (): void => {
    if (selectedTour) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedTour.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      {/* Tours Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {tours.map((tour, index) => (
          <div
            key={tour.id}
            className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => openModal(tour)}
          >
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                {tour.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative overflow-hidden">
                    <img
                      src={image}
                      alt={`${tour.title} ${imgIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{tour.title}</h3>

              <div className="flex items-center text-gray-500 mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base font-medium">{tour.location}</span>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                {tour.description}
              </p>

              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 pt-3 sm:pt-4 border-t border-gray-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{tour.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedTour && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Slider */}
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-900">
              <img
                src={selectedTour.images[currentImageIndex]}
                alt={`${selectedTour.title} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 transition-all duration-300 shadow-lg"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 transition-all duration-300 shadow-lg"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                {currentImageIndex + 1} / {selectedTour.images.length}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{selectedTour.title}</h2>

              <div className="flex items-center text-gray-600 mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-base sm:text-lg font-medium">{selectedTour.location}</span>
              </div>

              <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                {selectedTour.description}
              </p>

              <div className="flex items-center space-x-2 text-gray-600 pt-4 sm:pt-6 border-t border-gray-200">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-base sm:text-lg font-medium">{selectedTour.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
