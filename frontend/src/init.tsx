import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { NoMatchPage, LoginPage } from '@/common/pages';
import Chat from '@/common/pages/Chat';
import '@/style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/common/context/Auth';

const init = (): JSX.Element => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Chat />} />
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
