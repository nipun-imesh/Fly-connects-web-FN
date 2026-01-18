import { useEffect, useMemo, useRef, useState } from "react"
import OffersMiniGrid from "../components/ui/OffersMiniGrid"
import ToursGrid from "../components/ui/ToursGrid"
import { getOutboundDestination } from "../services/tourService"
import { getToursFromFirebase } from "../services/firebaseTourService"
import type { Tour } from "../services/tourService"

type TourTypeFilter = Tour["tourType"] | "All" | "Offer"

interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps {
  label: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  disabled?: boolean
}

function Dropdown({ label, value, options, onChange, disabled }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const onMouseDown = (e: MouseEvent): void => {
      const node = containerRef.current
      if (!node) return
      if (e.target instanceof Node && node.contains(e.target)) return
      setIsOpen(false)
    }

    document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [isOpen])

  const selectedLabel = useMemo(() => {
    const match = options.find((opt) => opt.value === value)
    return match?.label ?? value
  }, [options, value])

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return
          setIsOpen((prev) => !prev)
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false)
        }}
        className={
          disabled
            ? "w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500 font-medium text-left"
            : "w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-left font-semibold shadow-sm transition-colors hover:border-red-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none text-red-600"
        }
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="truncate">{selectedLabel}</span>
          <svg
            className={
              disabled
                ? "w-4 h-4 text-gray-400"
                : `w-4 h-4 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`
            }
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && !disabled && (
        <div
          role="listbox"
          className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={
                  isSelected
                    ? "w-full text-left px-4 py-3 bg-red-600 text-white font-semibold"
                    : "w-full text-left px-4 py-3 text-gray-800 hover:bg-red-600 hover:text-white"
                }
              >
                {option.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ToursPage() {
  const [selectedTourType, setSelectedTourType] = useState<TourTypeFilter>("All")
  const [selectedSubTour, setSelectedSubTour] = useState<string>("All")
  const [selectedInboundDuration, setSelectedInboundDuration] = useState<string>("All")
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTours = async () => {
      try {
        const fetchedTours = await getToursFromFirebase()
        // Assign IDs for display
        const toursWithIds = fetchedTours.map((tour: any, index: number) => ({
          ...tour,
          id: index + 1
        }))
        setTours(toursWithIds)
      } catch (error) {
        console.error("Error loading tours:", error)
      } finally {
        setLoading(false)
      }
    }
    loadTours()
  }, [])

  const outboundSubTours = useMemo(() => {
    const options = new Set<string>()
    tours
      .filter((tour) => tour.tourType === "Outbound")
      .forEach((tour) => {
        const destination = getOutboundDestination(tour)
        if (destination) options.add(destination)
      })
    return ["All", ...Array.from(options)]
  }, [tours])

  const inboundSubTours = useMemo(() => {
    const options = new Set<string>()
    tours
      .filter((tour) => tour.tourType === "Inbound")
      .forEach((tour) => {
        options.add(tour.location)
      })
    return ["All", ...Array.from(options)]
  }, [tours])

  const inboundDurations = useMemo(() => {
    const options = new Set<string>()
    tours.forEach((tour) => {
      options.add(tour.duration)
    })
    return ["All", ...Array.from(options).sort()]
  }, [tours])

  const tourTypeOptions = useMemo<DropdownOption[]>(
    () => [
      { label: "All Tours", value: "All" },
      { label: "Offer", value: "Offer" },
      { label: "Outbound Tours", value: "Outbound" },
      { label: "Inbound Tours", value: "Inbound" },
    ],
    [],
  )

  const subTourOptions = useMemo<DropdownOption[]>(() => {
    const labels =
      selectedTourType === "Outbound"
        ? outboundSubTours
        : selectedTourType === "Inbound"
          ? inboundSubTours
          : selectedTourType === "All"
            ? ["All", ...Array.from(new Set([...outboundSubTours.slice(1), ...inboundSubTours.slice(1)]))]
            : ["All"]
    return labels.map((label) => ({ label, value: label }))
  }, [inboundSubTours, outboundSubTours, selectedTourType])

  const durationOptions = useMemo<DropdownOption[]>(() => {
    return inboundDurations.map((duration) => ({ label: duration, value: duration }))
  }, [inboundDurations])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            Explore Our <span className="text-primary-600">Tours</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover extraordinary travel experiences tailored to your adventure style
          </p>
        </div>

        {/* Filters (dropdowns) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <Dropdown
              label="Tour Type"
              value={selectedTourType}
              options={tourTypeOptions}
              onChange={(next) => {
                setSelectedTourType(next as TourTypeFilter)
                setSelectedSubTour("All")
                setSelectedInboundDuration("All")
              }}
            />

            <Dropdown
              label="Sub Tour"
              value={selectedSubTour}
              options={subTourOptions}
              disabled={selectedTourType !== "Inbound"}
              onChange={(next) => setSelectedSubTour(next)}
            />

            <Dropdown
              label="Days"
              value={selectedInboundDuration}
              options={durationOptions}
              disabled={false}
              onChange={(next) => setSelectedInboundDuration(next)}
            />
          </div>
        </div>

        {selectedTourType === "Offer" && <OffersMiniGrid />}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <ToursGrid
            tours={tours}
            tourType={selectedTourType === "All" || selectedTourType === "Offer" ? undefined : selectedTourType}
            offerOnly={selectedTourType === "Offer"}
            subTour={selectedSubTour === "All" ? undefined : selectedSubTour}
            duration={selectedInboundDuration === "All" ? undefined : selectedInboundDuration}
          />
        )}
      </div>
    </div>
  )
}
