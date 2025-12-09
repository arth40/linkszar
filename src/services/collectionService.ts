import {
  get,
  push,
  ref,
  set,
  update,
  serverTimestamp,
} from 'firebase/database';
import { database, firestore } from '../firebase';
import type { Collection } from '../types/collection';
import { doc, getDoc } from 'firebase/firestore';
import toastMessage from './toasterService';

export const addNewCollection = (collection: Collection, userId?: string) => {
  if (userId) {
    push(ref(database, 'collections/' + userId), {
      ...collection,
      lastActivity: serverTimestamp(),
    });
  }
};

export const getUserCollections = async (
  userId?: string
): Promise<Record<string, Collection> | null> => {
  try {
    const userRef = ref(database, `collections/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const collectionData = snapshot.val() as Record<string, Collection>;
      return collectionData;
    } else {
      console.warn('No user data found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const getCollectionById = async (
  userId: string,
  collectionId: string
): Promise<Collection | null> => {
  try {
    const collectionRef = ref(
      database,
      `collections/${userId}/${collectionId}`
    );
    const snapshot = await get(collectionRef);
    if (snapshot.exists()) {
      const collectionData = snapshot.val() as Collection;
      return collectionData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting collection data:', error);
    return null;
  }
};

export const updateCollection = async (
  userId: string = '',
  collectionId: string,
  collection: Collection
): Promise<void> => {
  try {
    const collectionRef = ref(
      database,
      `collections/${userId}/${collectionId}`
    );
    await update(collectionRef, {
      ...collection,
      lastActivity: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating collection:', error);
  }
};

export const deleteCollection = async (
  userId: string = '',
  collectionId: string
) => {
  try {
    const linksRef = ref(database, `links/${userId}/${collectionId}`);
    const collectionLinks = await get(linksRef);
    if (collectionLinks.exists()) {
      await moveLinksToDefault(userId, collectionLinks.val());
    }

    const collectionRef = ref(
      database,
      `collections/${userId}/${collectionId}`
    );
    await set(collectionRef, null);
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
};

export const shareCollection = async (
  ownerId: string,
  collectionData: Collection,
  email: string
) => {
  try {
    const docSnap = await getDoc(doc(firestore, 'userEmails', email));
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const sharedRef = ref(
        database,
        `collections/${ownerId}/${collectionData.id}/sharedWith`
      );
      await push(sharedRef, { email, uid: userData.uid });

      const sharedWith = ref(
        database,
        `sharedCollection/${userData.uid}/${collectionData.id}`
      );
      set(sharedWith, {
        id: collectionData.id,
        name: collectionData.name,
        ownerId: ownerId,
      });
    } else {
      console.error('No such user with the provided email!');
      toastMessage('error', 'Email not registered with Linkzar!');
    }
  } catch (error) {
    console.error('Error sharing collection:', error);
  }
};

export const revokeSharedAccess = async (
  ownerId: string,
  collectionId: string,
  sharedAccessId: string
) => {
  try {
    const sharedRef = ref(
      database,
      `collections/${ownerId}/${collectionId}/sharedWith/${sharedAccessId}`
    );
    await set(sharedRef, null);
  } catch (error) {
    console.error('Error revoking shared access:', error);
  }
};

export const getSharedCollections = async (
  userId?: string
): Promise<Record<string, Collection> | null> => {
  try {
    const userRef = ref(database, `sharedCollection/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const collectionData = snapshot.val() as Record<string, Collection>;
      return collectionData;
    } else {
      console.warn('No shared collections found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting shared collections:', error);
    return null;
  }
};

export const moveLinksToDefault = async (
  userId: string,
  collections: Record<string, Collection>
) => {
  try {
    const collectionRef = ref(database, `links/${userId}/default`);
    await update(collectionRef, collections);
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
};
