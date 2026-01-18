import { useMemo } from "react"
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
  const filteredTours = useMemo(() => {
    let next = tourType ? tours.filter((tour) => tour.tourType === tourType) : tours

    if (offerOnly) {
      next = next.filter((tour) => tour.isOffer)
    }

    if (subTour) {
      if (tourType === "Outbound") {
        next = next.filter((tour) => getOutboundDestination(tour) === subTour)
      } else if (tourType === "Inbound") {
        next = next.filter((tour) => tour.location === subTour)
      } else {
        // When no tour type is selected, filter across both Outbound and Inbound
        next = next.filter((tour) => 
          getOutboundDestination(tour) === subTour || tour.location === subTour
        )
      }
    }

    if (duration) {
      next = next.filter((tour) => tour.duration === duration)
    }

    return next
  }, [tours, tourType, subTour, duration, offerOnly])

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {filteredTours.map((tour) => (
        <TourListCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}
