import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { ChatPage, LoginPage, NoMatchPage } from '@/common/pages';
import useAuth from '@/common/hooks/useAuth';
import { AuthLayout } from '@/common/context/Auth';

const RequireAuthLayout = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthLayout />}>
        <Route path="/">
          <Route element={<RequireAuthLayout />}>
            <Route index element={<ChatPage />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
