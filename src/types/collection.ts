import type { UserDetails } from './user';

export interface Collection {
  id?: string;
  name: string;
  description?: string;
  ownerId?: string;
  sharedWith?: Record<string, Partial<UserDetails>>;
  lastActivity?: number;
}
