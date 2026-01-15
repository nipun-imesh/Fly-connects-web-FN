export interface Tour {
  id: number
  title: string
  location: string
  price: number
  duration: string
  description: string
  images: string[]
  inclusions: string[]
  rating: number
  reviews: number
  difficulty: string
  category: string
  tourType: "Inbound" | "Outbound"
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

export const TOURS_DATA: Tour[] = [
  {
    id: 1,
    title: "Middle East Highlights",
    location: "Dubai, UAE",
    price: 2499,
    duration: "4 Days",
    description: "Discover Dubai's iconic skyline, desert adventures, and luxury experiences with a well-planned itinerary.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
    ],
    inclusions: [
      "Accommodation",
      "Daily breakfast",
      "Guided mountain trails",
      "Airport transfers",
      "Local transport",
    ],
    rating: 4.9,
    reviews: 234,
    difficulty: "Moderate",
    category: "Adventure",
    tourType: "Outbound"
  },
  {
    id: 2,
    title: "Tropical Paradise",
    location: "Maldives",
    price: 3299,
    duration: "5 Days",
    description: "Relax on pristine beaches and explore vibrant coral reefs in crystal clear waters.",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
    ],
    inclusions: [
      "Beach resort stay",
      "Daily breakfast",
      "Snorkeling experience",
      "Speedboat transfers",
      "Local assistance",
    ],
    rating: 5.0,
    reviews: 412,
    difficulty: "Easy",
    category: "Beach",
    tourType: "Outbound",
    isOffer: true
  },
  {
    id: 3,
    title: "Middle East Desert Adventure",
    location: "Dubai, UAE",
    price: 1899,
    duration: "4 Days",
    description: "Explore golden dunes, experience luxury, and witness stunning desert sunsets.",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80"
    ],
    inclusions: [
      "Hotel stay",
      "Desert safari",
      "Dune bashing",
      "BBQ dinner",
      "City transfers",
    ],
    rating: 4.8,
    reviews: 189,
    difficulty: "Easy",
    category: "Adventure",
    tourType: "Outbound"
  },
  {
    id: 4,
    title: "Malaysia City & Nature",
    location: "Kuala Lumpur, Malaysia",
    price: 2799,
    duration: "6 Days",
    description: "Explore Malaysia's vibrant city life, cultural landmarks, and scenic nature spots.",
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
      "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=800&q=80",
      "https://images.unsplash.com/photo-1582719369371-46b048f6d87d?w=800&q=80"
    ],
    inclusions: [
      "Hotel accommodation",
      "Guided site visit",
      "Entrance tickets",
      "Daily breakfast",
      "Local transfers",
    ],
    rating: 4.9,
    reviews: 567,
    difficulty: "Challenging",
    category: "Cultural",
    tourType: "Outbound"
  },
  {
    id: 5,
    title: "Bangkok City Break",
    location: "Bangkok, Thailand",
    price: 3499,
    duration: "5 Days",
    description: "Enjoy Bangkok's temples, street food, shopping, and nightlife with guided experiences.",
    images: [
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
      "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80"
    ],
    inclusions: [
      "Accommodation",
      "Northern lights tour",
      "Local transport",
      "Daily breakfast",
      "Tour guide",
    ],
    rating: 5.0,
    reviews: 328,
    difficulty: "Moderate",
    category: "Nature",
    tourType: "Outbound"
  },
  {
    id: 6,
    title: "Malaysia Island Escape",
    location: "Langkawi, Malaysia",
    price: 4299,
    duration: "7 Days",
    description: "Relax on beautiful beaches, explore island attractions, and enjoy a tropical getaway.",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
      "https://images.unsplash.com/photo-1535338454770-6c4e6685e69d?w=800&q=80",
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80"
    ],
    inclusions: [
      "Safari lodge stay",
      "Daily game drives",
      "Park entry fees",
      "All meals",
      "Airport transfers",
    ],
    rating: 4.9,
    reviews: 445,
    difficulty: "Moderate",
    category: "Wildlife",
    tourType: "Outbound"
  },
  {
    id: 7,
    title: "Maldives Escape",
    location: "Maldives",
    price: 2199,
    duration: "5 Days",
    description: "Unwind on pristine beaches and enjoy crystal-clear waters with resort comforts.",
    images: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
      "https://images.unsplash.com/photo-1591689161998-b9f9ff5fc6f7?w=800&q=80"
    ],
    inclusions: [
      "Hotel stay",
      "Daily breakfast",
      "Sunset cruise",
      "Airport transfers",
      "Local support",
    ],
    rating: 4.8,
    reviews: 302,
    difficulty: "Easy",
    category: "Beach",
    tourType: "Outbound",
    isOffer: true
  },
  {
    id: 8,
    title: "Sri Lanka Cultural Triangle",
    location: "Sri Lanka - Cultural Triangle",
    price: 999,
    duration: "5D-4N",
    description: "Explore heritage sites, ancient cities, and cultural highlights across Sri Lanka's iconic triangle.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80"
    ],
    inclusions: [
      "Hotel stay",
      "City tour",
      "Transit pass",
      "Daily breakfast",
      "Local guide",
    ],
    rating: 4.9,
    reviews: 521,
    difficulty: "Easy",
    category: "Cultural",
    tourType: "Inbound"
  },
  {
    id: 9,
    title: "Sri Lanka Hill Country",
    location: "Sri Lanka - Hill Country",
    price: 899,
    duration: "4D-3N",
    description: "Enjoy scenic train rides, cool climates, waterfalls, and tea estates in Sri Lanka's hill country.",
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1587138808182-85deaa02da0d?w=800&q=80",
      "https://images.unsplash.com/photo-1583552907108-d75c8ba9929d?w=800&q=80",
      "https://images.unsplash.com/photo-1606136563134-0abca0d26ea8?w=800&q=80"
    ],
    inclusions: [
      "Eco lodge stay",
      "Guided jungle walk",
      "River excursion",
      "All meals",
      "Local transfers",
    ],
    rating: 4.7,
    reviews: 198,
    difficulty: "Moderate",
    category: "Nature",
    tourType: "Inbound",
    isOffer: true
  },
  {
    id: 10,
    title: "Sri Lanka South Coast",
    location: "Sri Lanka - South Coast",
    price: 1099,
    duration: "6D-5N",
    description: "Relax along the southern beaches, enjoy coastal towns, and experience island hospitality.",
    images: [
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
    ],
    inclusions: [
      "Hotel stay",
      "Reef cruise",
      "Snorkeling gear",
      "Daily breakfast",
      "Local transfers",
    ],
    rating: 4.8,
    reviews: 389,
    difficulty: "Easy",
    category: "Beach",
    tourType: "Inbound"
  }
]

export const getTourById = (id: number): Tour | undefined => {
  return TOURS_DATA.find(tour => tour.id === id)
}

export const getToursByCategory = (category: string): Tour[] => {
  return TOURS_DATA.filter(tour => tour.category === category)
}

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
