# Admin Registration Guide

## Firestore Setup

To use the admin authentication system, you need to add admin users to Firestore.

### Firestore Collection Structure

Collection: `admins`

Document fields:
- `username` (string): Admin username
- `password` (string): Admin password (in production, use hashed passwords)
- `createdAt` (timestamp): Account creation date

### Adding Admin Users

#### Option 1: Using Firebase Console
1. Go to Firebase Console → Firestore Database
2. Create a new collection named `admins`
3. Add a new document with the following fields:
   ```
   username: "your-username"
   password: "your-password"
   createdAt: Current timestamp
   ```

#### Option 2: Using Firebase Admin SDK (Recommended for production)
Create a script to add admins with hashed passwords:

```javascript
import { getFirestore } from 'firebase-admin/firestore'
import bcrypt from 'bcrypt'

async function createAdmin(username, password) {
  const db = getFirestore()
  const hashedPassword = await bcrypt.hash(password, 10)
  
  await db.collection('admins').add({
    username,
    password: hashedPassword,
    createdAt: new Date()
  })
}
```

### Security Recommendations

⚠️ **IMPORTANT**: The current implementation stores passwords in plain text, which is NOT secure for production use.

For production:
1. Use Firebase Authentication instead of custom auth
2. Or implement password hashing (bcrypt) on both client and server
3. Add Firestore security rules to protect admin data
4. Use environment variables for sensitive data
5. Implement rate limiting for login attempts

### Firestore Security Rules

Add these rules to protect the admins collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /admins/{adminId} {
      // Only authenticated admins can read admin documents
      allow read: if request.auth != null;
      // No one can write directly (use Admin SDK)
      allow write: if false;
    }
  }
}
```

## Testing

1. Ensure Firebase environment variables are set in `.env`
2. Add at least one admin user to Firestore
3. Try logging in with those credentials

## Migration from Hardcoded Credentials

The old hardcoded credentials were:
- Username: `admin`
- Password: `admin123`

These have been **removed**. You must now create admin users in Firestore to log in.
