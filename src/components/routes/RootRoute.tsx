import { Spinner } from '@heroui/spinner';
import { useAuthStore } from '../../store/userStore';
import Landing from '../../pages/Landing';
import Dashboard from '../../pages/Dashboard';

export const RootRoute = () => {
  const { user, initialized } = useAuthStore();

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return user ? <Dashboard /> : <Landing />;
};
