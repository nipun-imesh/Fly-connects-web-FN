export interface Service {
  id: number
  title: string
  description: string
  details?: string[]
  image: string
  icon: string
  color: string
}

let servicesData: Service[] = []

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
