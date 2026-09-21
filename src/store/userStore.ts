// src/store/authStore.ts
import { create } from 'zustand';
import type { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  reload,
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
  deleteCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUserDetails: (details: UserDetails) => void;
  clearError: () => void;
  initialize: () => void;
  unsubscribe: (() => void) | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userDetails: null,
  loading: false,
  error: null,
  initialized: false,
  unsubscribe: null,

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
      try {
        await sendEmailVerification(userCreds.user);
      } catch (verifyError) {
        console.error('Send verification email error:', verifyError);
        toastMessage(
          'error',
          'Account created, but the verification email failed to send. You can resend it from the dashboard.'
        );
      }
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

  deleteCurrentUser: async () => {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
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

  resendVerificationEmail: async () => {
    if (!auth.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser);
      toastMessage('success', 'Verification email sent');
    } catch (error) {
      console.error('Resend verification error:', error);
      toastMessage('error', 'Could not send verification email');
    }
  },

  refreshUser: async () => {
    if (!auth.currentUser) return;
    await reload(auth.currentUser);
    set({ user: auth.currentUser });
  },

  setUserDetails: (details: UserDetails) => {
    set({ userDetails: details });
  },

  clearError: () => set({ error: null }),

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ user, initialized: true, loading: false });
      if (user) {
        await getUserData(user.uid);
      }
    });

    set({ unsubscribe });
  },
}));
