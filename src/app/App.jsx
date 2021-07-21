// @ts-check

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { RollbarContext } from '@rollbar/react';

import Chat from '../features/chat/index.jsx';
import Login from '../features/login/index.jsx';
import Signup from '../features/signup/index.jsx';

import NotFoundPage from '../features/notfoundpage/index.jsx';

import { AuthContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';

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
          <RollbarContext context="/">
            <Chat />
          </RollbarContext>
        </PrivateRoute>
        <Route path="/login">
          <RollbarContext context="/login">
            <Login />
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
