import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { Header } from '@/components';
import { ChatPage, LoginPage, NoMatchPage, SignupPage } from '@/pages';
import { useAuth } from '@/hooks';

const MainLayout = (): JSX.Element => (
  <div className="d-flex flex-column vh-100">
    <Header />
    <Outlet />
  </div>
);

const RequireAuthLayout = (): JSX.Element => {
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
      <Route path="/" element={<MainLayout />}>
        <Route element={<RequireAuthLayout />}>
          <Route index element={<ChatPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Route>
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
