// src/store/linkStore.ts
import { create } from 'zustand';
import type { Link } from '../types/link';
import {
  addNewLink,
  getUserLinks,
  deleteLink as fbDeleteLink,
  getCollectionLinks,
  deleteAllLinksInCollection as fbDeleteAllInCollection,
} from '../services/linkService';
import { useAuthStore } from './userStore';
import { useCollectionStore } from './collectionStore';

type LinkState = {
  links: Record<string, Record<string, Link>>;
  sharedLinks: Record<string, Link>;
  loading: boolean;
  error: string | null;

  fetchLinks: () => Promise<void>;
  fetchCollectionLinks: (collectionId: string) => Promise<void>;
  addLink: (collectionId: string, link: Link) => Promise<void>;
  deleteLink: (link: Link) => Promise<void>;
  clearLinks: () => void;
  getAllLinks: () => Record<string, Link>;
  getCollectionLinks: (collectionId: string) => Record<string, Link>;
  deleteAllLinksInCollection: (collectionId: string) => void;
  fetchSharedConnectionLinks: (
    ownerId: string,
    collectionId: string
  ) => Promise<void>;
};

export const useLinkStore = create<LinkState>((set, get) => ({
  links: {},
  sharedLinks: {},
  loading: false,
  error: null,

  // Load all links for the current user
  fetchLinks: async () => {
    try {
      set({ loading: true, error: null });
      const { user } = useAuthStore.getState();
      const userId = user?.uid;
      if (!userId) throw new Error('User not authenticated');

      const data = await getUserLinks(userId);

      set({
        links: (data as unknown as Record<string, Record<string, Link>>) || {},
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to load links',
        loading: false,
      });
    }
  },

  fetchCollectionLinks: async (collectionId: string) => {
    try {
      set({ loading: true, error: null });
      const { user } = useAuthStore.getState();
      const userId = user?.uid;
      if (!userId) throw new Error('User not authenticated');

      const data = await getCollectionLinks(userId, collectionId);

      set((state) => {
        return {
          links: {
            ...state.links,
            [collectionId]: data!,
          },
          loading: false,
        };
      });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to load links',
        loading: false,
      });
    }
  },

  // Add a new link to a collection
  addLink: async (collectionId, link) => {
    try {
      const { user } = useAuthStore.getState();
      const userId = user?.uid;
      if (!userId) throw new Error('User not authenticated');

      await addNewLink(collectionId, userId, link);

      await get().fetchCollectionLinks(collectionId);
    } catch (err: any) {
      set({ error: err.message || 'Failed to add link' });
    }
  },

  // Delete a link and update local state
  deleteLink: async (link) => {
    try {
      const { user } = useAuthStore.getState();
      const userId = user?.uid;

      if (!userId) throw new Error('User not authenticated');

      await fbDeleteLink(userId, link.collectionId!, link.id!);

      // Remove from local state
      set((state) => {
        const collectionLinks = state.links[link.collectionId!];
        if (!collectionLinks) return state;

        const updatedCollectionLinks = { ...collectionLinks };
        delete updatedCollectionLinks[link.id!];

        return {
          links: {
            ...state.links,
            [link.collectionId!]: updatedCollectionLinks,
          },
        };
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete link' });
    }
  },

  clearLinks: () => set({ links: {}, error: null }),

  getAllLinks: () => {
    set({ loading: true, error: null });
    const { links } = get();
    const { collections } = useCollectionStore.getState();

    const all: Record<string, Link> = {};

    if (links) {
      Object.entries(links).forEach(([collectionId, linkGroup]) => {
        if (linkGroup) {
          Object.entries(linkGroup).forEach(([linkId, linkData]) => {
            all[linkId] = {
              ...linkData,
              id: linkId,
              collectionId,
              collectionName: collections[collectionId]?.name || '(solo link)',
            };
          });
        }
      });
    }

    let sortedData;
    if (all) {
      sortedData = Object.entries(all).sort(
        ([, a], [, b]) => b.createdAt! - a.createdAt!
      );
    }
    const sortedDataObject = Object.fromEntries(sortedData!);
    set({ loading: false });
    return sortedDataObject;
  },

  getCollectionLinks: (collectionId) => {
    set({ loading: true, error: null });
    const { links } = get();

    const collectionLinks: Record<string, Link> = {};

    if (links[collectionId]) {
      Object.entries(links[collectionId]).forEach(([linkId, linkData]) => {
        collectionLinks[linkId] = {
          ...linkData,
          id: linkId,
          collectionId,
        };
      });
    }

    let sortedData;
    if (collectionLinks) {
      sortedData = Object.entries(collectionLinks).sort(
        ([, a], [, b]) => b.createdAt! - a.createdAt!
      );
    }
    const sortedDataObject = Object.fromEntries(sortedData!);
    set({ loading: false });
    return sortedDataObject;
  },

  deleteAllLinksInCollection: async (collectionId) => {
    try {
      const { user } = useAuthStore.getState();
      const userId = user?.uid;

      if (!userId) throw new Error('User not authenticated');

      await fbDeleteAllInCollection(userId, collectionId!);

      // Remove from local state
      set((state) => {
        delete state.links[collectionId];

        return {
          links: {
            ...state.links,
          },
        };
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete link' });
    }
  },

  fetchSharedConnectionLinks: async (userId: string, collectionId: string) => {
    try {
      set({ loading: true, error: null });

      const data = await getCollectionLinks(userId, collectionId);

      if (data) {
        Object.entries(data).forEach(([linkId, linkData]) => {
          data[linkId] = {
            ...linkData,
            id: linkId,
            collectionId,
          };
        });
      }
      let sortedData;
      if (data) {
        sortedData = Object.entries(data).sort(
          ([, a], [, b]) => b.createdAt! - a.createdAt!
        );
      }
      const sortedDataObject = Object.fromEntries(sortedData!);

      set({
        sharedLinks:
          (sortedDataObject as unknown as Record<string, Link>) || {},
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to load links',
        loading: false,
      });
    }
  },
}));
