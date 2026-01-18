// Cloudinary upload service
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export interface CloudinaryUploadResponse {
  secure_url: string
  public_id: string
  width: number
  height: number
}

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  formData.append("folder", "flyconnects-tours")

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Cloudinary API error:", errorData)
      throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary")
    }

    const data: CloudinaryUploadResponse = await response.json()
    return data.secure_url
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw error
  }
}

export const uploadBase64ToCloudinary = async (base64Data: string): Promise<string> => {
  const formData = new FormData()
  formData.append("file", base64Data)
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  formData.append("folder", "flyconnects-tours")

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Cloudinary API error:", errorData)
      throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary")
    }

    const data: CloudinaryUploadResponse = await response.json()
    return data.secure_url
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw error
  }
}
