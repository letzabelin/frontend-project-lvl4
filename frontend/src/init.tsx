import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { NoMatchPage, LoginPage } from '@/pages';
import App from '@/components/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/context/Auth';

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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
};

export default init;
