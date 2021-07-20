// @ts-check

import React, { useState } from 'react';
import { io } from 'socket.io-client';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { RollbarContext } from '@rollbar/react';

import Chat from '../features/chat/index.jsx';
import Signin from '../features/signin/index.jsx';
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
  const [isSignIn, setSignIn] = useState(!!userId);

  const signIn = () => {
    setSignIn(true);
  };

  const signOut = () => {
    window.localStorage.removeItem('userId');
    setSignIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children, path, exact }) => {
  const { isSignIn } = useAuth();

  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) => (isSignIn ? (
        children
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: location } }} />
      ))}
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <RollbarContext context="/chat">
            <WebSocketProvider>
              <Chat />
            </WebSocketProvider>
          </RollbarContext>
        </PrivateRoute>
        <Route path="/signin">
          <RollbarContext context="/signin">
            <Signin />
          </RollbarContext>
        </Route>
        <Route path="/signup">
          <RollbarContext context="/signup">
            <Signup />
          </RollbarContext>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
