import { useState, useEffect } from "react"
import type { Tour } from "../services/tourService"
import { getToursFromFirebase, addTourToFirebase, updateTourInFirebase, deleteTourFromFirebase } from "../services/firebaseTourService"
import { uploadImageToCloudinary, uploadBase64ToCloudinary } from "../services/cloudinary"

const MAX_IMAGES = 4

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Tour[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Tour | null>(null)
  
  // Image handling for multiple images
  const [imagePreviews, setImagePreviews] = useState<string[]>(Array(MAX_IMAGES).fill(""))
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(Array(MAX_IMAGES).fill(null))
  
  const [showAlert, setShowAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "success" as "success" | "error" | "confirm", onConfirm: (() => {}) as () => void })
  const [newInclusion, setNewInclusion] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const [offerIdMap, setOfferIdMap] = useState<Map<number, string>>(new Map())
  const [durationDays, setDurationDays] = useState("")
  const [durationNights, setDurationNights] = useState("")

  const [formData, setFormData] = useState<Omit<Tour, "id">>({
    title: "",
    location: "",
    price: "",
    currency: "LKR",
    duration: "",
    description: "",
    images: Array(MAX_IMAGES).fill(""),
    inclusions: [],
    tourType: "Offers",
    subTour: "",
    isOffer: true
  })

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async (): Promise<void> => {
    try {
      const fetchedTours = await getToursFromFirebase()
      // Filter only offers
      const offersOnly = fetchedTours.filter((tour: any) => tour.isOffer === true)
      
      // Assign auto-incrementing IDs and create map
      const idMap = new Map<number, string>()
      const offersWithIds = offersOnly.map((offer: any, index: number) => {
        const offerId = index + 1
        idMap.set(offerId, offer.firestoreId)
        return {
          ...offer,
          id: offerId
        }
      })
      
      setOffers(offersWithIds)
      setOfferIdMap(idMap)
    } catch (error) {
      console.error("Error loading offers:", error)
      setAlertConfig({
        title: "Error",
        message: "Failed to load offers. Please check your Firebase configuration.",
        type: "error",
        onConfirm: () => setShowAlert(false)
      })
      setShowAlert(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    
    // Validate image (Relaxed: Not strictly required if user wants to add an offer without image, 
    // but the UI implies an image is good. If user insists on "image eka nathuwa", we can skip this check 
    // or just warn. The prompt says "image eka nathuwa... add kranna" which means we should ALLOW it.)
    
    // COMMENTED OUT IMAGE VALIDATION to allow adding without image
    /*
    const hasImage = formData.images[0].trim() !== "" || imageFile !== null
    if (!hasImage) {
      setAlertConfig({
        title: "Missing Image",
        message: "Please provide an offer image before submitting.",
        type: "error",
        onConfirm: () => setShowAlert(false)
      })
      setShowAlert(true)
      return
    }
    */

    // Validate inclusions
    if (formData.inclusions.length === 0) {
      setAlertConfig({
        title: "Missing Inclusions",
        message: "Please add at least one package inclusion.",
        type: "error",
        onConfirm: () => setShowAlert(false)
      })
      setShowAlert(true)
      return
    }

    setIsUploading(true)
    
    try {
      // Upload images to Cloudinary
      const uploadedImageUrls: string[] = []
      
      for (let i = 0; i < MAX_IMAGES; i++) {
        setUploadProgress(`Uploading image ${i + 1} of ${MAX_IMAGES}...`)
        
        if (imageFiles[i]) {
          // Upload file to Cloudinary
          const url = await uploadImageToCloudinary(imageFiles[i]!)
          uploadedImageUrls.push(url)
        } else if (formData.images[i] && formData.images[i].trim() !== "") {
          // Check if it's a base64 image
          if (formData.images[i].startsWith("data:image")) {
            const url = await uploadBase64ToCloudinary(formData.images[i])
            uploadedImageUrls.push(url)
          } else {
            // Use existing URL
            uploadedImageUrls.push(formData.images[i])
          }
        }
      }

      setUploadProgress("Saving offer to Firebase...")

      const offerData = {
        ...formData,
        images: uploadedImageUrls,
        isOffer: true
      }
      
      if (editingOffer) {
        const firestoreId = (editingOffer as any).firestoreId || offerIdMap.get(editingOffer.id)
        if (!firestoreId) {
          throw new Error("Cannot update: Offer ID not found")
        }
        await updateTourInFirebase(firestoreId, offerData)
      } else {
        await addTourToFirebase(offerData)
      }
      
      await loadOffers()
      closeModal()
      
      setAlertConfig({
        title: "Success!",
        message: `Offer ${editingOffer ? "updated" : "added"} successfully!`,
        type: "success",
        onConfirm: () => setShowAlert(false)
      })
      setShowAlert(true)
    } catch (error) {
      console.error("Error saving offer:", error)
      setAlertConfig({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to save offer. Please try again.",
        type: "error",
        onConfirm: () => setShowAlert(false)
      })
      setShowAlert(true)
    } finally {
      setIsUploading(false)
      setUploadProgress("")
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    setAlertConfig({
      title: "Delete Offer",
      message: "Are you sure you want to delete this offer? This action cannot be undone.",
      type: "confirm",
      onConfirm: async () => {
        try {
          const firestoreId = offerIdMap.get(id)
          if (!firestoreId) {
            throw new Error("Cannot delete: Offer ID not found")
          }
          await deleteTourFromFirebase(firestoreId)
          await loadOffers()
          setShowAlert(false)
          setAlertConfig({
            title: "Success",
            message: "Offer deleted successfully!",
            type: "success",
            onConfirm: () => setShowAlert(false)
          })
          setShowAlert(true)
        } catch (error) {
          console.error("Error deleting offer:", error)
          setShowAlert(false)
          setAlertConfig({
            title: "Error",
            message: error instanceof Error ? error.message : "Failed to delete offer. Please try again.",
            type: "error",
            onConfirm: () => setShowAlert(false)
          })
          setShowAlert(true)
        }
      }
    })
    setShowAlert(true)
  }

  const handleEdit = (offer: Tour): void => {
    setEditingOffer(offer)
    
    // Parse duration string e.g., "7D 6N" or "7 Days"
    const durationMatch = offer.duration.match(/(\d+)\s*D\s*(\d+)\s*N/)
    if (durationMatch) {
      setDurationDays(durationMatch[1])
      setDurationNights(durationMatch[2])
    } else {
      // Fallback for old format "7 Days"
      const daysMatch = offer.duration.match(/(\d+)/)
      setDurationDays(daysMatch ? daysMatch[1] : "")
      setDurationNights("")
    }

    // Pad images to MAX_IMAGES
    const paddedImages = [...offer.images]
    while (paddedImages.length < MAX_IMAGES) paddedImages.push("")

    setFormData({
      title: offer.title,
      location: offer.location,
      price: offer.price,
      currency: offer.currency || "LKR",
      duration: offer.duration,
      description: offer.description,
      images: paddedImages,
      inclusions: offer.inclusions,
      tourType: offer.tourType,
      subTour: offer.subTour || "",
      isOffer: true
    })
    setImagePreviews(paddedImages)
    // Reset file inputs
    setImageFiles(Array(MAX_IMAGES).fill(null))
    setIsModalOpen(true)
  }

  const openModal = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
    setEditingOffer(null)
    setImagePreviews(Array(MAX_IMAGES).fill(""))
    setImageFiles(Array(MAX_IMAGES).fill(null))
    setNewInclusion("")
    setDurationDays("")
    setDurationNights("")
    setFormData({
      title: "",
      location: "",
      price: "",
      currency: "LKR",
      duration: "",
      description: "",
      images: Array(MAX_IMAGES).fill(""),
      inclusions: [],
      tourType: "Offers",
      subTour: "",
      isOffer: true
    })
  }

  const handleDurationChange = (type: "days" | "nights", value: string) => {
    let d = type === "days" ? value : durationDays
    let n = type === "nights" ? value : durationNights

    if (type === "days") setDurationDays(value)
    if (type === "nights") setDurationNights(value)

    let newDuration = ""
    if (d && n) {
      newDuration = `${d}D ${n}N`
    } else if (d) {
      newDuration = `${d} Days`
    }
    
    setFormData(prev => ({ ...prev, duration: newDuration }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    if (name.startsWith("image-")) {
      const index = parseInt(name.split("-")[1])
      const newImages = [...formData.images]
      newImages[index] = value
      const newPreviews = [...imagePreviews]
      newPreviews[index] = value
      setFormData({ ...formData, images: newImages })
      setImagePreviews(newPreviews)
    } else if (name === "price") {
      setFormData({ ...formData, [name]: value })
    } else if (name === "title" || name === "location") {
      // Capitalize first letter of the string
      const capitalizedValue = value.length > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : value
      setFormData({ ...formData, [name]: capitalizedValue })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const addInclusion = (): void => {
    if (newInclusion.trim()) {
      setFormData({ ...formData, inclusions: [...formData.inclusions, newInclusion.trim()] })
      setNewInclusion("")
    }
  }

  const removeInclusion = (index: number): void => {
    const newInclusions = formData.inclusions.filter((_, idx) => idx !== index)
    setFormData({ ...formData, inclusions: newInclusions })
  }

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setAlertConfig({
          title: "Invalid File",
          message: "Please upload a valid image file (JPG, PNG, GIF, etc.)",
          type: "error",
          onConfirm: () => setShowAlert(false)
        })
        setShowAlert(true)
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setAlertConfig({
          title: "File Too Large",
          message: "Image size should not exceed 5MB. Please choose a smaller image.",
          type: "error",
          onConfirm: () => setShowAlert(false)
        })
        setShowAlert(true)
        return
      }

      const newImageFiles = [...imageFiles]
      newImageFiles[index] = file
      setImageFiles(newImageFiles)

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        const newPreviews = [...imagePreviews]
        newPreviews[index] = result
        setImagePreviews(newPreviews)
        
        // Also update formData.images for preview consistencies if needed
        const newImages = [...formData.images]
        newImages[index] = result
        setFormData({ ...formData, images: newImages })
      }
      reader.onerror = () => {
        setAlertConfig({
          title: "Upload Failed",
          message: "Failed to read the image file. Please try again.",
          type: "error",
          onConfirm: () => setShowAlert(false)
        })
        setShowAlert(true)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Offers Management</h1>
          <p className="text-gray-600 mt-1">Manage your special offer packages</p>
        </div>
        <button
          onClick={openModal}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={offer.images[0]} 
                alt={offer.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              {/* Offer Badge */}
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                SPECIAL OFFER
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              {/* Title & Location */}
              <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{offer.title}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="line-clamp-1">{offer.location}</span>
                </div>
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Price</div>
                  <div className="text-sm font-bold text-primary-600">{offer.currency || "Rs"} {offer.price}</div>
                </div>
                <div className="text-center border-l border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Duration</div>
                  <div className="text-sm font-semibold text-gray-700">{offer.duration}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{offer.description}</p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(offer)}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
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
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
              {editingOffer ? "Edit Offer" : "Add New Offer"}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                  <div className="flex gap-2">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none bg-white"
                    >
                      <option value="LKR">LKR</option>
                      <option value="USD">USD</option>
                    </select>
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
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="1"
                        value={durationDays}
                        onChange={(e) => handleDurationChange("days", e.target.value)}
                        placeholder="Days"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                      />
                      <span className="absolute right-3 top-3 text-gray-400 text-sm">Days</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        value={durationNights}
                        onChange={(e) => handleDurationChange("nights", e.target.value)}
                        placeholder="Nights"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                      />
                      <span className="absolute right-3 top-3 text-gray-400 text-sm">Nights</span>
                    </div>
                  </div>
                  {/* Hidden input to ensure required validation works if needed */}
                  <input type="hidden" name="duration" value={formData.duration} />
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Package Inclusions</label>
                
                {/* Add Inclusion Input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addInclusion()
                      }
                    }}
                    placeholder="Type an inclusion and click Add"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addInclusion}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>

                {/* Inclusions List */}
                {formData.inclusions.length > 0 && (
                  <div className="space-y-2">
                    {formData.inclusions.map((inclusion, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="flex-1 text-gray-700">{inclusion}</span>
                        <button
                          type="button"
                          onClick={() => removeInclusion(idx)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          aria-label="Remove inclusion"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {formData.inclusions.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No inclusions added yet. Add at least one inclusion above.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Offer Images (At least 1 required)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: MAX_IMAGES }).map((_, idx) => (
                    <div key={idx} className="space-y-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-600">Image {idx + 1}</h4>
                        {/* Clear button if image exists */}
                        {imagePreviews[idx] && (
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = [...formData.images]
                              newImages[idx] = ""
                              const newPreviews = [...imagePreviews]
                              newPreviews[idx] = ""
                              const newFiles = [...imageFiles]
                              newFiles[idx] = null
                              setFormData({ ...formData, images: newImages })
                              setImagePreviews(newPreviews)
                              setImageFiles(newFiles)
                            }}
                            className="text-xs text-red-600 hover:text-red-700 font-semibold"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      
                      {/* Image Preview */}
                      {imagePreviews[idx] && (
                        <div className="relative group">
                          <img 
                            src={imagePreviews[idx]} 
                            alt={`Preview ${idx + 1}`}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "https://via.placeholder.com/400x300?text=Invalid+Image"
                            }}
                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">Preview {idx + 1}</span>
                          </div>
                        </div>
                      )}

                      {/* Upload File */}
                      <label className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 bg-gray-50 hover:bg-gray-100">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-xs text-gray-600 font-medium">Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFile(e, idx)}
                          className="hidden"
                        />
                      </label>

                      {/* URL Input */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Or Enter URL {formData.images[idx] && <span className="text-green-600 ml-1">✓</span>}
                        </label>
                        <input
                          type="url"
                          name={`image-${idx}`}
                          value={formData.images[idx]}
                          onChange={handleChange}
                          placeholder="https://images..."
                          className="w-full px-3 py-2 text-sm rounded-lg border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isUploading}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm">{uploadProgress || "Uploading..."}</span>
                    </>
                  ) : (
                    <span>{editingOffer ? "Update" : "Add"} Offer</span>
                  )}
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
