import { get, ref, set, update } from 'firebase/database';
import { database, firestore } from '../firebase';
import type { UserDetails } from '../types/user';
import { useAuthStore } from '../store/userStore';
import { doc, setDoc } from 'firebase/firestore';

export const saveUserData = async (user: UserDetails, userId?: string) => {
  const { setUserDetails } = useAuthStore.getState();
  if (userId) {
    await set(ref(database, 'users/' + userId), {
      email: user.email,
      role: user.role,
      name: user.name,
      handle: user.handle,
    });
    await setDoc(doc(firestore, 'userEmails', user.email), {
      uid: userId,
      email: user.email,
    });
    setUserDetails(user);
  }
};

export const getUserData = async (
  userId?: string
): Promise<UserDetails | null> => {
  try {
    const { setUserDetails } = useAuthStore.getState();
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val() as UserDetails;
      await setUserDetails(userData);
      return userData;
    } else {
      console.warn('No user data found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const updateDisplayName = async (
  userId: string = '',
  name: string
): Promise<void> => {
  try {
    const userRef = ref(database, `users/${userId}`);
    await update(userRef, { name });
    await getUserData(userId);
  } catch (error) {
    console.error('Error updating display name:', error);
  }
};
