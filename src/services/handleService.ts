import { get, ref, runTransaction } from 'firebase/database';
import { database } from '../firebase';

const RESERVED_HANDLES = new Set([
  'login',
  'register',
  'account',
  'dashboard',
  'about',
  'api',
  'admin',
  'www',
  'app',
  'support',
  'terms',
  'privacy',
  'settings',
  'portfolio',
  'home',
  'linkszar',
  'null',
  'undefined',
]);

const HANDLE_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;

export const sanitizeHandle = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 30);

export const isHandleFormatValid = (handle: string): boolean =>
  HANDLE_PATTERN.test(handle) && !RESERVED_HANDLES.has(handle);

export const isHandleAvailable = async (handle: string): Promise<boolean> => {
  if (!isHandleFormatValid(handle)) return false;
  const snapshot = await get(ref(database, `handles/${handle}`));
  return !snapshot.exists();
};

export const claimHandle = async (
  handle: string,
  uid: string
): Promise<boolean> => {
  if (!isHandleFormatValid(handle)) return false;
  const handleRef = ref(database, `handles/${handle}`);
  const result = await runTransaction(handleRef, (current) => {
    if (current === null) return uid;
    return undefined;
  });
  return result.committed;
};

export const getUidForHandle = async (
  handle: string
): Promise<string | null> => {
  const snapshot = await get(ref(database, `handles/${handle}`));
  return snapshot.exists() ? (snapshot.val() as string) : null;
};
