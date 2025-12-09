import { get, push, ref, set, serverTimestamp } from 'firebase/database';
import { database } from '../firebase';
import type { Link } from '../types/link';

export const addNewLink = (
  collectionId: string,
  userId: string,
  linksData: Link
) => {
  if (userId) {
    push(ref(database, `links/${userId}/${collectionId}`), {
      ...linksData,
      createdAt: serverTimestamp(),
    });

    if (collectionId !== 'default') {
      set(
        ref(database, `collections/${userId}/${collectionId}/lastActivity`),
        serverTimestamp()
      );
    }
  }
};

export const getUserLinks = async (
  userId?: string
): Promise<Record<string, Link> | null> => {
  try {
    const userRef = ref(database, `links/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const LinksData = snapshot.val() as Record<string, Link>;
      return LinksData;
    } else {
      console.warn('No links data found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting Links data:', error);
    return null;
  }
};

export const getCollectionLinks = async (
  userId: string,
  collectionId: string
) => {
  try {
    const collectionRef = ref(database, `links/${userId}/${collectionId}`);
    const snapshot = await get(collectionRef);

    if (snapshot.exists()) {
      const LinksData = snapshot.val() as Record<string, Link>;
      return LinksData;
    } else {
      console.warn('No links data found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting Links data:', error);
    return null;
  }
};

export const deleteLink = async (
  userId: string = '',
  collectionId: string,
  linkId: string
) => {
  try {
    const linkRef = ref(database, `links/${userId}/${collectionId}/${linkId}`);
    await set(linkRef, null);
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
};

export const deleteAllLinksInCollection = async (
  userId: string = '',
  collectionId: string
) => {
  try {
    const linkRef = ref(database, `links/${userId}/${collectionId}`);
    await set(linkRef, null);
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
};
