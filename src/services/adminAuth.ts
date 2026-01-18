import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { getFirebaseApp } from "./firebase";

interface AdminCredentials {
  email: string;
  password: string;
}

interface NewAdminData {
  username: string;
  password: string;
  email: string;
  role?: string;
}

let cachedDb: Firestore | null | undefined;

const getDb = (): Firestore | null => {
  if (cachedDb !== undefined) return cachedDb;

  const app = getFirebaseApp();
  if (!app) {
    cachedDb = null;
    return cachedDb;
  }

  cachedDb = getFirestore(app);
  return cachedDb;
};

// -----------------------------
// Register Admin
// -----------------------------
export const registerAdmin = async (
  adminData: NewAdminData,
): Promise<{ success: boolean; error?: string; adminId?: string }> => {
  try {
    const db = getDb();
    const auth = getAuth();

    if (!db) {
      return {
        success: false,
        error: "Firebase is not configured.",
      };
    }

    // 1) Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      adminData.email,
      adminData.password,
    );

    const user = userCredential.user;

    // 2) Save admin data in Firestore using UID as document ID
    await setDoc(doc(db, "admins", user.uid), {
      uid: user.uid,
      username: adminData.username,
      email: adminData.email,
      role: adminData.role || "admin",
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      adminId: user.uid,
    };
  } catch (error: any) {
    console.error("Admin registration error:", error);
    return {
      success: false,
      error: error.message || "Registration failed.",
    };
  }
};

// -----------------------------
// Authenticate Admin
// -----------------------------
export const authenticateAdmin = async (
  credentials: AdminCredentials,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const auth = getAuth();
    const db = getDb();

    if (!db) {
      return {
        success: false,
        error: "Firebase is not configured.",
      };
    }

    // 1) Sign in using Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    );

    const user = userCredential.user;

    // 2) Verify admin exists in Firestore
    const adminDoc = await getDocs(
      query(collection(db, "admins"), where("uid", "==", user.uid))
    );

    if (adminDoc.empty) {
      return {
        success: false,
        error: "Not an admin account.",
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Admin authentication error:", error);
    return {
      success: false,
      error: error.message || "Login failed.",
    };
  }
};
