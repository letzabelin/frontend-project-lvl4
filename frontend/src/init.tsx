import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { NoMatchPage, LoginPage } from '@/pages';
import App from '@/components/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const init = (): JSX.Element => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NoMatchPage />} />
      </>,
    ),
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default init;
