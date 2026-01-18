import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

import { getDb } from "./firebase";
import type { Tour } from "./tourService";

export interface FirebaseTour extends Omit<Tour, "id"> {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TourWithId extends Tour {
  firestoreId: string;
}

const TOURS_COLLECTION = "tours";

// Get all tours from Firebase
export const getToursFromFirebase = async (): Promise<TourWithId[]> => {
  try {
    const db = getDb();
    if (!db) {
      throw new Error("Firebase is not initialized");
    }

    const toursCollection = collection(db, TOURS_COLLECTION);
    const q = query(toursCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const tours: TourWithId[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirebaseTour;

      tours.push({
        ...data,
        firestoreId: doc.id,
      } as TourWithId);
    });

    return tours;
  } catch (error) {
    console.error("Error fetching tours from Firebase:", error);
    throw error;
  }
};

// Add new tour to Firebase
export const addTourToFirebase = async (tourData: Omit<Tour, "id">): Promise<string> => {
  try {
    const db = getDb();
    if (!db) {
      throw new Error("Firebase is not initialized");
    }

    const toursCollection = collection(db, TOURS_COLLECTION);
    const tourWithTimestamp: FirebaseTour = {
      ...tourData,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };

    const docRef = await addDoc(toursCollection, tourWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("Error adding tour to Firebase:", error);
    throw error;
  }
};

// Update existing tour in Firebase
export const updateTourInFirebase = async (tourId: string, tourData: Partial<Tour>): Promise<void> => {
  try {
    const db = getDb();
    if (!db) {
      throw new Error("Firebase is not initialized");
    }

    const tourDoc = doc(db, TOURS_COLLECTION, tourId);

    const updateData = {
      ...tourData,
      updatedAt: serverTimestamp(),
    };

    // Remove id field if present
    if ("id" in updateData) {
      delete (updateData as { id?: number }).id;
    }

    await updateDoc(tourDoc, updateData);
  } catch (error) {
    console.error("Error updating tour in Firebase:", error);
    throw error;
  }
};

// Delete tour from Firebase
export const deleteTourFromFirebase = async (tourId: string): Promise<void> => {
  try {
    const db = getDb();
    if (!db) {
      throw new Error("Firebase is not initialized");
    }

    const tourDoc = doc(db, TOURS_COLLECTION, tourId);
    await deleteDoc(tourDoc);
  } catch (error) {
    console.error("Error deleting tour from Firebase:", error);
    throw error;
  }
};

// Get tour by ID from Firebase
export const getTourByIdFromFirebase = async (tourId: string): Promise<TourWithId | null> => {
  try {
    const tours = await getToursFromFirebase();
    return tours.find((tour) => tour.firestoreId === tourId) || null;
  } catch (error) {
    console.error("Error fetching tour by ID from Firebase:", error);
    throw error;
  }
};
