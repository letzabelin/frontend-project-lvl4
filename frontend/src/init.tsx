import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { NoMatch, Login } from '@/pages/index';
import App from '@/components/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const init = (): JSX.Element => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
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
