import { useState, useEffect } from "react"
import { getAllServices, addService, updateService, deleteService } from "../services/serviceData"
import type { Service } from "../services/serviceData"

export default function AdminOffersPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<Omit<Service, "id">>({
    title: "",
    description: "",
    image: "",
    icon: "",
    color: "from-cyan-500 to-blue-600"
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = (): void => {
    setServices(getAllServices())
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    
    if (editingService) {
      updateService(editingService.id, formData)
    } else {
      addService(formData)
    }
    
    loadServices()
    closeModal()
  }

  const handleEdit = (service: Service): void => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image,
      icon: service.icon,
      color: service.color
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number): void => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id)
      loadServices()
    }
  }

  const openModal = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
    setEditingService(null)
    setFormData({
      title: "",
      description: "",
      image: "",
      icon: "",
      color: "from-cyan-500 to-blue-600"
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">What We Offer Management</h1>
        <button
          onClick={openModal}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
        >
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                <span className="text-2xl">{service.icon}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 flex items-center justify-center transition-all duration-300"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none bg-white"
                >
                  <option value="from-cyan-500 to-blue-600">Cyan to Blue</option>
                  <option value="from-purple-500 to-pink-600">Purple to Pink</option>
                  <option value="from-green-500 to-teal-600">Green to Teal</option>
                  <option value="from-orange-500 to-red-600">Orange to Red</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
                >
                  {editingService ? "Update" : "Add"} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
