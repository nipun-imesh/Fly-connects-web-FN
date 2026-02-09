export interface ItineraryItem {
  title: string
  description: string
}

export interface Tour {
  id: number
  title: string
  location: string
  price: string
  currency: 'LKR' | 'USD'
  duration: string
  description: string
  images: string[]
  inclusions: string[]
  itinerary?: ItineraryItem[]
  tourType: string
  subTour?: string
  isOffer?: boolean
}

export const getOutboundDestination = (tour: Tour): "Middle East" | "Maldives" | "Malaysia" | "Bangkok" | null => {
  const haystack = `${tour.title} ${tour.location}`.toLowerCase()

  if (haystack.includes("maldives")) return "Maldives"
  if (haystack.includes("malaysia") || haystack.includes("kuala lumpur") || haystack.includes("langkawi")) return "Malaysia"
  if (haystack.includes("bangkok") || haystack.includes("thailand")) return "Bangkok"
  if (haystack.includes("dubai") || haystack.includes("uae") || haystack.includes("qatar") || haystack.includes("doha") || haystack.includes("middle east")) {
    return "Middle East"
  }

  return null
}

// Tours data - using Firebase for storage
export const TOURS_DATA: Tour[] = []

export const getTourById = (id: number): Tour | undefined => {
  return TOURS_DATA.find(tour => tour.id === id)
}

// export const getToursByCategory = (category: string): Tour[] => {
//   return TOURS_DATA.filter(tour => tour.category === category)
// }


export const getAllTours = (): Tour[] => {
  return TOURS_DATA
}

export const addTour = (tour: Omit<Tour, "id">): Tour => {
  const newTour = {
    ...tour,
    id: Math.max(...TOURS_DATA.map(t => t.id), 0) + 1
  }
  TOURS_DATA.push(newTour)
  return newTour
}

export const updateTour = (id: number, tour: Partial<Tour>): Tour | undefined => {
  const index = TOURS_DATA.findIndex(t => t.id === id)
  if (index === -1) return undefined
  
  TOURS_DATA[index] = { ...TOURS_DATA[index], ...tour }
  return TOURS_DATA[index]
}

export const deleteTour = (id: number): boolean => {
  const initialLength = TOURS_DATA.length
  const index = TOURS_DATA.findIndex(t => t.id === id)
  if (index !== -1) {
    TOURS_DATA.splice(index, 1)
  }
  return TOURS_DATA.length < initialLength
}
