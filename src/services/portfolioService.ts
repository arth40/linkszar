import { get, ref, set } from 'firebase/database';
import { database } from '../firebase';
import toastMessage from './toasterService';
import type { Portfolio } from '../types/portfolio.';

export const createOrUpdatePortoflio = async (
  portfolio: Portfolio,
  userId?: string
) => {
  try {
    if (userId) {
      const portfolioRef = ref(database, 'portfolio/' + userId);
      await set(portfolioRef, portfolio);
    }
  } catch (err) {
    toastMessage('error', 'Unable to sync');
  }
};

export const getPorfolio = async (
  userId?: string
): Promise<Portfolio | null> => {
  try {
    const portfolioRef = ref(database, `portfolio/${userId}`);
    const snapshot = await get(portfolioRef);

    if (snapshot.exists()) {
      const portfolioData = snapshot.val() as Portfolio;
      return portfolioData;
    } else {
      console.warn('No links data found.');
      return null;
    }
  } catch (error) {
    console.error('Error getting Links data:', error);
    return null;
  }
};
