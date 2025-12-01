// src/store/authStore.ts
import { create } from 'zustand';
import type { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';
import type { UserDetails } from '../types/user';
import { getUserData } from '../services/userService';
import toastMessage from '../services/toasterService';

interface AuthState {
  user: User | null;
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  setUserDetails: (details: UserDetails) => void;
  clearError: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userDetails: null,
  loading: false,
  error: null,
  initialized: false,

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toastMessage('success', 'Logged in');
    } catch (error) {
      toastMessage('error', 'Invalid credentials');
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string): Promise<User | null> => {
    set({ loading: true, error: null });
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toastMessage('success', 'User registered');
      return userCreds.user;
    } catch (error) {
      set({ error: (error as Error).message });
      if ((error as Error).message.includes('email-already-in-use')) {
        toastMessage('error', 'User already exists');
      } else {
        toastMessage('error', 'Something went wrong');
      }
      return null;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
      set({ userDetails: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  sendPasswordReset: async (email: string) => {
    set({ loading: true, error: null });
    try {
      await sendPasswordResetEmail(auth, email);
      toastMessage('success', 'Email sent succesfully');
    } catch (error) {
      console.error('Reset password error:', error);
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Failed to send reset email.' });
      }
      toastMessage('error', 'Failed to send reset email');
    } finally {
      set({ loading: false });
    }
  },

  setUserDetails: (details: UserDetails) => {
    set({ userDetails: details });
  },

  clearError: () => set({ error: null }),

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ user, initialized: true, loading: false });
      await getUserData(user?.uid);
    });

    // Store the unsubscribe function for cleanup
    (get() as any).unsubscribe = unsubscribe;
  },
}));
