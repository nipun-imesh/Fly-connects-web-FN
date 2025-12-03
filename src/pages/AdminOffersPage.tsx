import { useState, useEffect } from "react"
import { getAllServices, addService, updateService, deleteService } from "../services/serviceData"
import type { Service } from "../services/serviceData"

export default function AdminOffersPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "success" as "success" | "error" | "confirm", onConfirm: (() => {}) as () => void })
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
    setImagePreview(service.image)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number): void => {
    setAlertConfig({
      title: "Delete Service",
      message: "Are you sure you want to delete this service? This action cannot be undone.",
      type: "confirm",
      onConfirm: () => {
        deleteService(id)
        loadServices()
        setShowAlert(false)
        setAlertConfig({
          title: "Success",
          message: "Service deleted successfully!",
          type: "success",
          onConfirm: () => setShowAlert(false)
        })
        setShowAlert(true)
      }
    })
    setShowAlert(true)
  }

  const openModal = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
    setEditingService(null)
    setImagePreview("")
    setFormData({
      title: "",
      description: "",
      image: "",
      icon: "",
      color: "from-cyan-500 to-blue-600"
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    if (name === "image") {
      setImagePreview(value)
    }
  }

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setFormData({ ...formData, image: result })
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">What We Offer Management</h1>
          <p className="text-gray-600 mt-1">Manage your services and offerings</p>
        </div>
        <button
          onClick={openModal}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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

              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image Preview</label>
                  <div className="relative group">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">Image Preview</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Upload File */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image File</label>
                <label className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm text-gray-600 font-medium">Click to upload image</span>
                  <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Or Enter Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {editingService ? "Update" : "Add"} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Alert Modal */}
      {showAlert && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => alertConfig.type !== "confirm" && setShowAlert(false)}
          />
          
          {/* Alert Box */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-[90vw] border-2 border-red-500">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  alertConfig.type === "success" ? "bg-gradient-to-br from-green-500 to-green-600" :
                  alertConfig.type === "error" ? "bg-gradient-to-br from-red-500 to-orange-500" :
                  "bg-gradient-to-br from-yellow-500 to-orange-500"
                }`}>
                  {alertConfig.type === "success" ? (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : alertConfig.type === "error" ? (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {alertConfig.title}
              </h3>
              
              {/* Message */}
              <p className="text-gray-600 text-center mb-6">
                {alertConfig.message}
              </p>
              
              {/* Buttons */}
              {alertConfig.type === "confirm" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAlert(false)}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={alertConfig.onConfirm}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    alertConfig.onConfirm()
                    setShowAlert(false)
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
