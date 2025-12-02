export interface Tour {
  id: number
  title: string
  location: string
  price: number
  duration: string
  description: string
  images: string[]
  rating: number
  reviews: number
  difficulty: string
  category: string
}

export const TOURS_DATA: Tour[] = [
  {
    id: 1,
    title: "Mountain Paradise",
    location: "Swiss Alps",
    price: 2499,
    duration: "7 Days",
    description: "Experience the breathtaking beauty of the Swiss Alps with guided mountain trails asda sdasdas asdasdase asewq d asdasd asd asd asd asdasd asdasda sdasdas asdasdasd asdasd asda sdasda sdasdasdas asdasdasda dassdasdasd asdasdasfa sdasdadas asasda sdasdasda a. ",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
    ],
    rating: 4.9,
    reviews: 234,
    difficulty: "Moderate",
    category: "Adventure"
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
    rating: 5.0,
    reviews: 412,
    difficulty: "Easy",
    category: "Beach"
  },
  {
    id: 3,
    title: "Desert Adventure",
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
    rating: 4.8,
    reviews: 189,
    difficulty: "Easy",
    category: "Adventure"
  },
  {
    id: 4,
    title: "Ancient Wonders",
    location: "Machu Picchu, Peru",
    price: 2799,
    duration: "6 Days",
    description: "Journey through history exploring ancient Incan ruins and mystical landscapes.",
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
      "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=800&q=80",
      "https://images.unsplash.com/photo-1582719369371-46b048f6d87d?w=800&q=80"
    ],
    rating: 4.9,
    reviews: 567,
    difficulty: "Challenging",
    category: "Cultural"
  },
  {
    id: 5,
    title: "Northern Lights",
    location: "Iceland",
    price: 3499,
    duration: "8 Days",
    description: "Witness the magical Aurora Borealis and explore Iceland's dramatic landscapes.",
    images: [
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
      "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80"
    ],
    rating: 5.0,
    reviews: 328,
    difficulty: "Moderate",
    category: "Nature"
  },
  {
    id: 6,
    title: "Safari Experience",
    location: "Serengeti, Tanzania",
    price: 4299,
    duration: "10 Days",
    description: "Embark on an unforgettable wildlife safari through Africa's most iconic landscapes.",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
      "https://images.unsplash.com/photo-1535338454770-6c4e6685e69d?w=800&q=80",
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80"
    ],
    rating: 4.9,
    reviews: 445,
    difficulty: "Moderate",
    category: "Wildlife"
  },
  {
    id: 7,
    title: "Santorini Sunset",
    location: "Santorini, Greece",
    price: 2199,
    duration: "5 Days",
    description: "Experience the iconic white-washed buildings and stunning sunsets of this Mediterranean paradise.",
    images: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
      "https://images.unsplash.com/photo-1591689161998-b9f9ff5fc6f7?w=800&q=80"
    ],
    rating: 4.8,
    reviews: 302,
    difficulty: "Easy",
    category: "Beach"
  },
  {
    id: 8,
    title: "Tokyo Explorer",
    location: "Tokyo, Japan",
    price: 3199,
    duration: "7 Days",
    description: "Immerse yourself in the perfect blend of ancient tradition and cutting-edge modernity.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80"
    ],
    rating: 4.9,
    reviews: 521,
    difficulty: "Easy",
    category: "Cultural"
  },
  {
    id: 9,
    title: "Amazon Rainforest",
    location: "Amazon Basin, Brazil",
    price: 2899,
    duration: "6 Days",
    description: "Venture into the world's largest rainforest and discover incredible biodiversity.",
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1587138808182-85deaa02da0d?w=800&q=80",
      "https://images.unsplash.com/photo-1583552907108-d75c8ba9929d?w=800&q=80",
      "https://images.unsplash.com/photo-1606136563134-0abca0d26ea8?w=800&q=80"
    ],
    rating: 4.7,
    reviews: 198,
    difficulty: "Challenging",
    category: "Nature"
  },
  {
    id: 10,
    title: "Great Barrier Reef",
    location: "Queensland, Australia",
    price: 3799,
    duration: "8 Days",
    description: "Dive into the world's largest coral reef system and witness marine life like never before.",
    images: [
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
    ],
    rating: 5.0,
    reviews: 389,
    difficulty: "Moderate",
    category: "Adventure"
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
