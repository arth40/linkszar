// src/components/PublicRoute.tsx
import { Spinner } from '@heroui/spinner';
import { useAuthStore } from '../../store/userStore';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const PublicRoute = ({
  children,
  redirectTo = '/',
}: PublicRouteProps) => {
  const location = useLocation();
  const { user, initialized } = useAuthStore();

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (user && ['/register', '/login'].includes(location.pathname)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
