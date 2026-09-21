import { Routes, Route } from 'react-router-dom';
import useViewportHeight from './hooks/ViewPortHook';
import { ProtectedRoute } from './components/routes/ProtectedRoutes';
import { PublicRoute } from './components/routes/PublicRoutes';
import { RootRoute } from './components/routes/RootRoute';
import { AuthProvider } from './components/AuthProvider';
import { Toaster } from 'react-hot-toast';
import NotFound from './pages/NotFound';

import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import PortfolioPreview from './pages/portfolio/PortfolioPreview';

function App() {
  useViewportHeight();

  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<RootRoute />} />
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
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/:handle" element={<PortfolioPreview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
