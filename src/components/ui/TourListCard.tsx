import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Tour } from "../../services/tourService"

interface TourListCardProps {
  tour: Tour
}

const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`
}

export default function TourListCard({ tour }: TourListCardProps) {
  const navigate = useNavigate()
  const [imageIndex, setImageIndex] = useState<number>(0)

  const currentImage = tour.images[imageIndex]

  const goToDetails = (): void => {
    navigate(`/tours/${tour.id}`)
  }

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    setImageIndex((prev) => (prev + 1) % tour.images.length)
  }

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    setImageIndex((prev) => (prev === 0 ? tour.images.length - 1 : prev - 1))
  }

  const dots = useMemo(() => {
    return tour.images.map((_, idx) => idx)
  }, [tour.images])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter") goToDetails()
      }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-red-200 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left: Image slider */}
        <div className="relative md:w-5/12 h-56 sm:h-64 md:h-auto md:min-h-[240px] bg-gray-900 overflow-hidden">
          <img
            src={currentImage}
            alt={`${tour.title} ${imageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

          {/* Slider controls */}
          {tour.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 shadow"
                aria-label="Previous image"
              >
                <svg
                  className="w-4 h-4 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 shadow"
                aria-label="Next image"
              >
                <svg
                  className="w-4 h-4 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {dots.map((idx) => (
                  <span
                    key={idx}
                    className={`h-2 w-2 rounded-full transition-all duration-200 ${
                      idx === imageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Price badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-lg font-bold text-gray-900">{formatPrice(tour.price)}</p>
            <p className="text-[11px] text-gray-600">per person</p>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {tour.title}
              </h3>
              <div className="flex items-center text-gray-600 mt-2">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{tour.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold text-gray-900">{tour.rating}</span>
              <span className="text-gray-500">({tour.reviews})</span>
            </div>
          </div>

          <p className="text-gray-700 mt-4 line-clamp-3">
            {tour.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {tour.duration}
            </span>

            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              {tour.difficulty}
            </span>

            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              {tour.category}
            </span>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goToDetails()
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-primary-500/30"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
