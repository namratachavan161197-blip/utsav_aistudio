import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfigData from '../../firebase-applet-config.json';
import { INITIAL_FESTIVALS, INITIAL_NOTES, Festival, NoteItem } from '../data/utsavData';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfigData) : getApp();

// Initialize Firestore with custom databaseId if present
export const db = firebaseConfigData.firestoreDatabaseId
  ? getFirestore(app, firebaseConfigData.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

/**
 * Ensures a user is signed in (using anonymous auth as instant seamless authentication)
 */
export async function ensureAuthUser(): Promise<User> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsubscribe();
        resolve(user);
      } else {
        try {
          const cred = await signInAnonymously(auth);
          unsubscribe();
          resolve(cred.user);
        } catch (err) {
          console.warn('Anonymous auth failed, creating pseudo-session user:', err);
          unsubscribe();
          // Fallback user object if offline or auth restricted
          resolve({
            uid: 'namrata_chavan_default',
            isAnonymous: true,
          } as unknown as User);
        }
      }
    });
  });
}

/**
 * Real-time listener for Festivals
 */
export function subscribeToFestivals(
  onData: (festivals: Festival[]) => void,
  onError?: (err: Error) => void
) {
  const festivalsRef = collection(db, 'festivals');

  return onSnapshot(
    festivalsRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // Seed initial festivals to Firestore
        try {
          for (const fest of INITIAL_FESTIVALS) {
            const docRef = doc(db, 'festivals', fest.id);
            await setDoc(docRef, fest);
          }
        } catch (e) {
          console.warn('Seeding festivals failed:', e);
        }
        onData(INITIAL_FESTIVALS);
      } else {
        const list: Festival[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as Festival);
        });
        onData(list);
      }
    },
    (error) => {
      console.warn('Firestore festivals snapshot error:', error);
      if (onError) onError(error);
      onData(INITIAL_FESTIVALS);
    }
  );
}

/**
 * Real-time listener for User Notes
 */
export function subscribeToUserNotes(
  userId: string,
  onData: (notes: NoteItem[]) => void,
  onError?: (err: Error) => void
) {
  const notesRef = collection(db, 'users', userId, 'notes');

  return onSnapshot(
    notesRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // Seed default sample notes for initial experience
        try {
          for (const note of INITIAL_NOTES) {
            const docRef = doc(db, 'users', userId, 'notes', note.id);
            await setDoc(docRef, {
              ...note,
              userId,
              updatedAt: serverTimestamp(),
            });
          }
        } catch (e) {
          console.warn('Seeding user notes failed:', e);
        }
        onData(INITIAL_NOTES);
      } else {
        const notesList: NoteItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          notesList.push({
            id: docSnap.id,
            festivalId: data.festivalId || 'diwali',
            festivalName: data.festivalName || 'Diwali 2024',
            title: data.title || '',
            category: data.category || 'Shopping',
            timeAgo: data.timeAgo || 'Just now',
            description: data.description || '',
            hasReminder: !!data.hasReminder,
            reminder: data.reminder,
            budget: data.budget,
            estimatedSpend: data.estimatedSpend,
            imageUrl: data.imageUrl,
            checklist: data.checklist,
          });
        });
        onData(notesList);
      }
    },
    (error) => {
      console.warn('Firestore user notes snapshot error:', error);
      if (onError) onError(error);
      onData(INITIAL_NOTES);
    }
  );
}

/**
 * Create or add a Festive Note in real-time
 */
export async function addRealtimeNote(userId: string, note: NoteItem) {
  const noteRef = doc(db, 'users', userId, 'notes', note.id);
  await setDoc(noteRef, {
    ...note,
    userId,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Update an existing Festive Note in real-time
 */
export async function updateRealtimeNote(
  userId: string,
  noteId: string,
  updates: Partial<NoteItem>
) {
  const noteRef = doc(db, 'users', userId, 'notes', noteId);
  await updateDoc(noteRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a Festive Note in real-time
 */
export async function deleteRealtimeNote(userId: string, noteId: string) {
  const noteRef = doc(db, 'users', userId, 'notes', noteId);
  await deleteDoc(noteRef);
}
