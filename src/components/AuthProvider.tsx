// src/components/AuthProvider.tsx
import { useEffect } from 'react';
import { useAuthStore } from '../store/userStore';
import '../styles/authlayout.scss';
import { Spinner } from '@heroui/spinner';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { initialize, initialized, loading } = useAuthStore();

  useEffect(() => {
    initialize();

    // Cleanup on unmount
    return () => {
      const store = useAuthStore.getState() as any;
      if (store.unsubscribe) {
        store.unsubscribe();
      }
    };
  }, [initialize]);

  if (!initialized || loading) {
    return (
      <div className="flex w-full items-center justify-center min-h-screen authlayout">
        <div className="text-lg">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
