import { get, ref, set } from 'firebase/database';
import { database } from '../firebase';
import toastMessage from './toasterService';
import type { Portfolio, PublicPortfolio } from '../types/portfolio';
import { getUidForHandle } from './handleService';

export const createOrUpdatePortfolio = async (
  portfolio: Portfolio,
  userId?: string
) => {
  try {
    if (userId) {
      const portfolioRef = ref(database, 'portfolio/' + userId);
      await set(portfolioRef, portfolio);
    }
  } catch (error) {
    console.error('Error syncing portfolio:', error);
    toastMessage('error', 'Unable to sync');
  }
};

export const getPortfolio = async (
  userId?: string
): Promise<Portfolio | null> => {
  try {
    const portfolioRef = ref(database, `portfolio/${userId}`);
    const snapshot = await get(portfolioRef);
    return snapshot.exists() ? (snapshot.val() as Portfolio) : null;
  } catch (error) {
    console.error('Error getting portfolio data:', error);
    return null;
  }
};

export const getPublicPortfolioByHandle = async (
  handle: string
): Promise<PublicPortfolio | null> => {
  try {
    const uid = await getUidForHandle(handle);
    if (!uid) return null;

    const [userSnapshot, portfolioSnapshot] = await Promise.all([
      get(ref(database, `users/${uid}`)),
      get(ref(database, `portfolio/${uid}`)),
    ]);

    if (!userSnapshot.exists()) return null;

    const user = userSnapshot.val();
    const portfolio = portfolioSnapshot.exists()
      ? (portfolioSnapshot.val() as Portfolio)
      : { about: '', links: [] };

    return {
      handle,
      name: user.name || '',
      about: portfolio.about || '',
      links: portfolio.links || [],
    };
  } catch (error) {
    console.error('Error getting public portfolio:', error);
    return null;
  }
};
