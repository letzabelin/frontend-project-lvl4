// @ts-check

import React, { useState } from 'react';
import { io } from 'socket.io-client';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Chat from '../features/chat/index.jsx';
import Login from '../features/login/index.jsx';
import Signup from '../features/signup/index.jsx';

import NotFoundPage from '../features/notfoundpage/index.jsx';

import { AuthContext, WebSocketContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';

const WebSocketProvider = ({ children }) => {
  const socket = io();

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [isLogIn, setLogIn] = useState(!!userId);

  const logIn = () => {
    setLogIn(true);
  };

  const signOut = () => {
    window.localStorage.removeItem('userId');
    setLogIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLogIn, logIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children, path, exact }) => {
  const { isLogIn } = useAuth();

  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) => (isLogIn ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ))}
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <WebSocketProvider>
            <Chat />
          </WebSocketProvider>
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
