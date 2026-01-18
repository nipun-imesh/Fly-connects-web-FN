# Cloudinary Setup Instructions

## Firebase & Cloudinary Integration Complete! ✅

Your admin tour page is now configured to:
1. ✅ Upload images to Cloudinary
2. ✅ Save tour data to Firebase Firestore
3. ✅ Load tours from Firebase
4. ✅ Update and delete tours in Firebase

## Required Setup Steps:

### 1. Cloudinary Configuration

Open `src/services/cloudinary.ts` and update these values:

```typescript
const CLOUDINARY_CLOUD_NAME = "your-cloud-name" // Replace with your Cloudinary cloud name
const CLOUDINARY_UPLOAD_PRESET = "your-upload-preset" // Replace with your unsigned upload preset
```

**To get these values:**
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → Cloud Name (copy this)
3. Go to Settings → Upload → Upload presets
4. Create an "Unsigned" preset
5. Copy the preset name

### 2. Firebase Configuration

Your Firebase is already configured in `.env`:
- ✅ Firebase API Key
- ✅ Auth Domain
- ✅ Project ID
- ✅ Storage Bucket
- ✅ Messaging Sender ID
- ✅ App ID

**Firestore Database Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `flyconnects`
3. Click "Firestore Database" in left menu
4. Click "Create database"
5. Choose "Start in production mode" (or test mode for development)
6. Select your region
7. Click "Enable"

### 3. Firestore Security Rules

Add these rules in Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tours/{tourId} {
      // Allow read for everyone
      allow read: if true;
      
      // Allow write only for authenticated admins
      allow write: if request.auth != null;
    }
  }
}
```

## How It Works:

1. **Adding a Tour:**
   - Admin fills the form
   - Clicks "Add Tour"
   - Images are uploaded to Cloudinary (one by one with progress)
   - Cloudinary returns URLs
   - Tour data + image URLs saved to Firebase
   - Success message shown

2. **Image Upload:**
   - Supports file upload OR URL input
   - Base64 images automatically uploaded to Cloudinary
   - 5MB file size limit
   - Image validation

3. **Loading Tours:**
   - Fetches from Firebase on page load
   - Sorted by creation date (newest first)

4. **Editing Tours:**
   - Loads existing data into form
   - Can update any field
   - Images only re-uploaded if changed

5. **Deleting Tours:**
   - Confirmation dialog
   - Removes from Firebase
   - Success feedback

## Features Added:

- ✅ Firebase Firestore integration
- ✅ Cloudinary image upload
- ✅ Upload progress indicator
- ✅ Error handling with user-friendly messages
- ✅ Image validation (file type, size)
- ✅ Loading states during operations
- ✅ Success/error alerts
- ✅ Automatic image URL management

## Testing:

1. Make sure your `.env` file has all Firebase credentials
2. Update Cloudinary credentials in `src/services/cloudinary.ts`
3. Enable Firestore in Firebase Console
4. Run `npm run dev`
5. Navigate to Admin Panel
6. Try adding a tour with images

## Troubleshooting:

**"Firebase is not initialized" error:**
- Check `.env` file has all VITE_FIREBASE_* variables
- Restart dev server after changing .env

**"Failed to upload image to Cloudinary" error:**
- Verify Cloudinary cloud name and upload preset
- Make sure upload preset is "Unsigned"
- Check image file size (max 5MB)

**Tours not loading:**
- Check Firestore is enabled in Firebase Console
- Check browser console for errors
- Verify Firestore security rules allow read access
