export interface Service {
  id: number
  title: string
  description: string
  details?: string[]
  image: string
  icon: string
  color: string
}

let servicesData: Service[] = [
  {
    id: 1,
    title: "Guided Tours",
    description: "Expert guides bring destinations to life with rich stories and local insights jkj jjkjhjk jkhkjhjkh jkhhjhjk hjkhjkh khkjjhk bhkbnb jbhj gjh jkhkj hkj hk hk hjkhjkh jkbhb kb kjbkjbkjbkj jkbjkbkj bkbjkbabnshdbhh hiuhhbsahdb hbhbas hbkhbashdh bhjbhkbashjdb bbbmzsbd bbasfddb hjsbajkbjkdb jabjsbdjkasjbnj basjbdjkj basb.",
    details: [
      "Local guides with destination expertise",
      "Flexible schedules and curated itineraries",
      "Pick-up and drop-off options (where available)",
      "Support for families, couples, and groups",
    ],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
    icon: "🗺️",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 2,
    title: "Luxury Stays",
    description: "Hand-picked premium accommodations for ultimate comfort and relaxation.",
    details: [
      "Carefully selected hotels and resorts",
      "Options for breakfast / half-board / full-board",
      "Honeymoon and family-friendly suggestions",
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    icon: "🏨",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 3,
    title: "Adventure Sports",
    description: "Thrilling activities for adrenaline seekers and adventure enthusiasts.",
    details: [
      "Activity recommendations by difficulty level",
      "Season-based planning and safety guidance",
      "Group and private options",
    ],
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    icon: "⛷️",
    color: "from-cyan-500 to-blue-600"
  }
]

export const getAllServices = (): Service[] => {
  return servicesData
}

export const getServiceById = (id: number): Service | undefined => {
  return servicesData.find(service => service.id === id)
}

export const addService = (service: Omit<Service, "id">): Service => {
  const newService = {
    ...service,
    id: Math.max(...servicesData.map(s => s.id), 0) + 1
  }
  servicesData = [...servicesData, newService]
  return newService
}

export const updateService = (id: number, service: Partial<Service>): Service | undefined => {
  const index = servicesData.findIndex(s => s.id === id)
  if (index === -1) return undefined
  
  servicesData[index] = { ...servicesData[index], ...service }
  return servicesData[index]
}

export const deleteService = (id: number): boolean => {
  const initialLength = servicesData.length
  servicesData = servicesData.filter(s => s.id !== id)
  return servicesData.length < initialLength
}
