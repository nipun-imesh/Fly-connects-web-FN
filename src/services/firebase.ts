import { initializeApp } from "firebase/app"
import type { FirebaseApp } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import type { Analytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import type { Firestore } from "firebase/firestore"

interface FirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL?: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

const firebaseEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
}

const requiredKeys: Array<keyof typeof firebaseEnv> = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
]

let cachedApp: FirebaseApp | null | undefined

const canInitializeFirebase = (): boolean => {
  return requiredKeys.every((key) => Boolean(firebaseEnv[key]))
}

export const getFirebaseApp = (): FirebaseApp | null => {
  if (cachedApp !== undefined) return cachedApp

  if (!canInitializeFirebase()) {
    cachedApp = null
    return cachedApp
  }

  const firebaseConfig: FirebaseConfig = {
    apiKey: firebaseEnv.apiKey as string,
    authDomain: firebaseEnv.authDomain as string,
    databaseURL: firebaseEnv.databaseURL,
    projectId: firebaseEnv.projectId as string,
    storageBucket: firebaseEnv.storageBucket as string,
    messagingSenderId: firebaseEnv.messagingSenderId as string,
    appId: firebaseEnv.appId as string,
    measurementId: firebaseEnv.measurementId,
  }

  cachedApp = initializeApp(firebaseConfig)
  return cachedApp
}

export const getFirebaseAnalytics = async (): Promise<Analytics | null> => {
  const app = getFirebaseApp()
  if (!app) return null
  if (!firebaseEnv.measurementId) return null

  try {
    const supported = await isSupported()
    if (!supported) return null
    return getAnalytics(app)
  } catch {
    return null
  }
}

export const getFirebaseFirestore = (): Firestore | null => {
  const app = getFirebaseApp()
  if (!app) return null
  return getFirestore(app)
}

export const getDb = (): Firestore | null => {
  return getFirebaseFirestore()
}
