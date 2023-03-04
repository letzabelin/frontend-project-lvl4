import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { NoMatchPage, LoginPage } from '@/common/pages';
import Chat from '@/common/pages/Chat';
import '@/style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/common/context/Auth';

const init = (): JSX.Element => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default init;
