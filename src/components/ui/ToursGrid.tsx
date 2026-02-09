import { useEffect, useMemo, useState } from "react"
import { getOutboundDestination } from "../../services/tourService"
import type { Tour } from "../../services/tourService"
import TourListCard from "./TourListCard"

interface ToursGridProps {
  tours: Tour[]
  tourType?: Tour["tourType"]
  subTour?: string
  duration?: string
  offerOnly?: boolean
}

export default function ToursGrid({ tours, tourType, subTour, duration, offerOnly }: ToursGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const filteredTours = useMemo(() => {
    let next = tourType ? tours.filter((tour) => tour.tourType === tourType) : tours

    if (offerOnly) {
      next = next.filter((tour) => tour.isOffer)
    }

    if (subTour) {
      if (tourType === "Outbound") {
        next = next.filter((tour) => getOutboundDestination(tour) === subTour)
      } else if (tourType === "Inbound") {
        next = next.filter((tour) => tour.subTour === subTour)
      } else {
        // When no tour type is selected, filter across both Outbound and Inbound
        next = next.filter((tour) => 
          getOutboundDestination(tour) === subTour || tour.subTour === subTour
        )
      }
    }

    if (duration) {
      next = next.filter((tour) => tour.duration === duration)
    }

    return next
  }, [tours, tourType, subTour, duration, offerOnly])

  useEffect(() => {
    setCurrentPage(1)
  }, [tourType, subTour, duration, offerOnly, tours])

  const totalPages = Math.max(1, Math.ceil(filteredTours.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * pageSize
  const visibleTours = filteredTours.slice(start, start + pageSize)

  if (filteredTours.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No tours found</h2>
        <p className="text-gray-600">
          {tourType ? `No ${tourType.toLowerCase()} tours are available right now.` : "No tours are available right now."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {visibleTours.map((tour) => (
          <TourListCard key={tour.id} tour={tour} />
        ))}
      </div>

      {filteredTours.length > pageSize && (
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:border-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={safePage === 1}
          >
            Previous
          </button>
          <div className="text-sm font-semibold text-gray-700">
            Page {safePage} of {totalPages}
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:border-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safePage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
