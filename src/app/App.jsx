// @ts-check

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Chat, Signin, Signup } from '../containers/index.js';
import { NotFoundPage } from '../components/index.js';

import AuthContext from '../contexts/AuthContext.js';
import useAuth from '../hooks/useAuth.js';

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
          <Chat />
        </PrivateRoute>
        <Route path="/signin">
          <Signin />
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
