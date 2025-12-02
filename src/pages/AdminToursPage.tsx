import { useState, useEffect } from "react"
import { getAllTours, addTour, updateTour, deleteTour } from "../services/tourService"
import type { Tour } from "../services/tourService"

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [formData, setFormData] = useState<Omit<Tour, "id">>({
    title: "",
    location: "",
    price: 0,
    duration: "",
    description: "",
    images: ["", "", "", ""],
    rating: 5,
    reviews: 0,
    difficulty: "Easy",
    category: "Adventure"
  })

  useEffect(() => {
    loadTours()
  }, [])

  const loadTours = (): void => {
    setTours(getAllTours())
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    
    if (editingTour) {
      updateTour(editingTour.id, formData)
    } else {
      addTour(formData)
    }
    
    loadTours()
    closeModal()
  }

  const handleEdit = (tour: Tour): void => {
    setEditingTour(tour)
    setFormData({
      title: tour.title,
      location: tour.location,
      price: tour.price,
      duration: tour.duration,
      description: tour.description,
      images: tour.images,
      rating: tour.rating,
      reviews: tour.reviews,
      difficulty: tour.difficulty,
      category: tour.category
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number): void => {
    if (confirm("Are you sure you want to delete this tour?")) {
      deleteTour(id)
      loadTours()
    }
  }

  const openModal = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
    setEditingTour(null)
    setFormData({
      title: "",
      location: "",
      price: 0,
      duration: "",
      description: "",
      images: ["", "", "", ""],
      rating: 5,
      reviews: 0,
      difficulty: "Easy",
      category: "Adventure"
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    if (name.startsWith("image-")) {
      const index = parseInt(name.split("-")[1])
      const newImages = [...formData.images]
      newImages[index] = value
      setFormData({ ...formData, images: newImages })
    } else if (name === "price" || name === "rating" || name === "reviews") {
      setFormData({ ...formData, [name]: Number(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tours Management</h1>
        <button
          onClick={openModal}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
        >
          Add New Tour
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Images Grid - 2x2 */}
            <div className="relative h-56 overflow-hidden">
              <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                {tour.images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="relative overflow-hidden group">
                    <img 
                      src={img} 
                      alt={`${tour.title} ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                ))}
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              {/* Title & Location */}
              <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{tour.title}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="line-clamp-1">{tour.location}</span>
                </div>
              </div>

              {/* Price, Duration, Rating */}
              <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Price</div>
                  <div className="text-sm font-bold text-primary-600">${tour.price}</div>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Duration</div>
                  <div className="text-sm font-semibold text-gray-700">{tour.duration}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Rating</div>
                  <div className="text-sm font-semibold text-gray-700 flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {tour.rating}
                  </div>
                </div>
              </div>

              {/* Difficulty & Category Tags */}
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {tour.difficulty}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  {tour.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{tour.description}</p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tour.id)}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
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
              {editingTour ? "Edit Tour" : "Add New Tour"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 7 Days"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none bg-white"
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Beach">Beach</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Nature">Nature</option>
                    <option value="Wildlife">Wildlife</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reviews</label>
                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Images (4 URLs)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      type="url"
                      name={`image-${idx}`}
                      value={formData.images[idx]}
                      onChange={handleChange}
                      required
                      placeholder={`Image ${idx + 1} URL`}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    />
                  ))}
                </div>
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
                  {editingTour ? "Update" : "Add"} Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
