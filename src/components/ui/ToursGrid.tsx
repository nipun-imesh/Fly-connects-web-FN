import { useState, useEffect } from "react"
import { getAllTours, getOutboundDestination } from "../../services/tourService"
import type { Tour } from "../../services/tourService"
import TourListCard from "./TourListCard"

interface ToursGridProps {
  tourType?: Tour["tourType"]
  subTour?: string
  duration?: string
  offerOnly?: boolean
}

export default function ToursGrid({ tourType, subTour, duration, offerOnly }: ToursGridProps) {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState<boolean>(true)

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const filteredTours = (() => {
    let next = tourType ? tours.filter((tour) => tour.tourType === tourType) : tours

    if (offerOnly) {
      next = next.filter((tour) => tour.isOffer)
    }

    if (tourType === "Outbound" && subTour) {
      next = next.filter((tour) => getOutboundDestination(tour) === subTour)
    }

    if (tourType === "Inbound" && subTour) {
      next = next.filter((tour) => tour.location === subTour)
    }

    if (duration) {
      next = next.filter((tour) => tour.duration === duration)
    }

    return next
  })()

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
