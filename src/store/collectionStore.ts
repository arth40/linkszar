import { create } from 'zustand';
import type { Collection } from '../types/collection';
import {
  addNewCollection,
  getUserCollections,
  updateCollection as fbUpdate,
  deleteCollection as fbDelete,
  shareCollection as fbShareCollection,
  getSharedCollections,
  getCollectionById,
  revokeSharedAccess as fbRevokeAccess,
} from '../services/collectionService';
import { useAuthStore } from './userStore';

type CollectionState = {
  collections: Record<string, Collection>;
  sharedCollections: Record<string, Collection>;
  loading: boolean;
  error: string | null;

  fetchCollections: (userId: string) => Promise<void>;
  fetchSharedCollections: () => Promise<void>;
  addCollection: (collection: Collection, userId?: string) => Promise<void>;
  updateCollection: (
    userId: string,
    collectionId: string,
    data: Partial<Collection>
  ) => Promise<void>;
  deleteCollection: (collectionId: string) => Promise<void>;
  shareCollection: (
    ownerId: string,
    collectionData: Collection,
    email: string
  ) => Promise<void>;
  revokeSharedAccess: (
    ownerId: string,
    collectionId: string,
    accessId: string
  ) => Promise<void>;
};

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: {},
  sharedCollections: {},
  loading: false,
  error: null,

  // Load all collections for a user
  fetchCollections: async (userId: string) => {
    try {
      set({ loading: true, error: null });

      const data = await getUserCollections(userId);

      set({
        collections: data || {},
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to load collections',
        loading: false,
      });
    }
  },

  fetchSharedCollections: async () => {
    try {
      set({ loading: true, error: null });

      const { user } = useAuthStore.getState();
      const userId = user?.uid;
      if (!userId) throw new Error('User not authenticated');

      const data = await getSharedCollections(userId);
      set({ sharedCollections: data || {}, loading: false });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to load shared collections',
        loading: false,
      });
    }
  },

  // Add a new collection
  addCollection: async (collection: Collection, userId?: string) => {
    try {
      if (userId) {
        await addNewCollection(collection, userId);

        // Refresh state
        await get().fetchCollections(userId);
      }
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  // Update an existing collection
  updateCollection: async (
    userId: string,
    collectionId: string,
    data: Partial<Collection>
  ) => {
    try {
      await fbUpdate(userId, collectionId, data as Collection);

      // Update local state without full refetch
      set((state) => ({
        collections: {
          ...state.collections,
          [collectionId]: {
            ...state.collections[collectionId],
            ...data,
          },
        },
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  // Delete a collection
  deleteCollection: async (collectionId: string) => {
    try {
      const { user } = useAuthStore.getState();
      const userId = user?.uid;
      if (!userId) return;
      console.log();
      await fbDelete(userId, collectionId);

      // Remove from local state
      set((state) => {
        const updated = { ...state.collections };
        delete updated[collectionId];
        return { collections: updated };
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  shareCollection: async (
    ownerId: string,
    collectionData: Collection,
    email: string
  ) => {
    try {
      // Implementation for sharing collection
      await fbShareCollection(ownerId, collectionData, email);
      const updatedData = await getCollectionById(ownerId, collectionData.id!);
      set((state) => ({
        collections: {
          ...state.collections,
          [collectionData.id!]: { ...updatedData! },
        },
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  revokeSharedAccess: async (
    ownerId: string,
    collectionId: string,
    sharedAccessId: string
  ) => {
    await fbRevokeAccess(ownerId, collectionId, sharedAccessId);
    const updatedData = await getCollectionById(ownerId, collectionId);
    set((state) => ({
      collections: {
        ...state.collections,
        [collectionId]: { ...updatedData! },
      },
    }));
  },
}));
