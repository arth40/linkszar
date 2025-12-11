import { Routes, Route } from 'react-router-dom';
import useViewportHeight from './hooks/ViewPortHook';
import { ProtectedRoute } from './components/routes/ProtectedRoutes';
import { PublicRoute } from './components/routes/PublicRoutes';
import { AuthProvider } from './components/AuthProvider';
import { Toaster } from 'react-hot-toast';
import NotFound from './pages/NotFound';
import { useAuthStore } from './store/userStore';
import { useEffect } from 'react';
import { getUserData } from './services/userService';
import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';

import { usePWAInstallPrompt } from './hooks/PWAInstallHook';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Collection from './pages/collection/Collection';
import Profile from './pages/Profile';
import Shared from './pages/Shared';
import MainLayout from './components/MainLayout';
import { useCollectionStore } from './store/collectionStore';
import CollectionLinks from './pages/collection/CollectionLinks';
import Portfolio from './pages/portfolio/Portfolio';
import PortfolioPreview from './pages/portfolio/PortfolioPreview';

function App() {
  useViewportHeight();
  const { user } = useAuthStore();
  const { fetchCollections, fetchSharedCollections } = useCollectionStore();
  const { showPrompt, promptToInstall, clearPromptData } =
    usePWAInstallPrompt();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        await getUserData(user.uid);
        await fetchCollections(user.uid);
        await fetchSharedCollections();
      }
    };
    fetchUserDetails();
  }, [user]);

  return (
    <AuthProvider>
      <Toaster />
      {showPrompt && (
        <Alert
          color="primary"
          description="Bored of visiting website install app on home screen"
          isClosable
          endContent={
            <Button
              color="primary"
              size="sm"
              variant="flat"
              onPress={promptToInstall}
            >
              Install
            </Button>
          }
          onClose={clearPromptData}
          title="Install app"
          variant="faded"
        />
      )}
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collection"
            element={
              <ProtectedRoute>
                <Collection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collection/:id"
            element={
              <ProtectedRoute>
                <CollectionLinks page="collection" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shared"
            element={
              <ProtectedRoute>
                <Shared />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shared/:ownerId/:id"
            element={
              <ProtectedRoute>
                <CollectionLinks page="shared" />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/portfolio/:id"
          element={
            <PublicRoute>
              <PortfolioPreview />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
