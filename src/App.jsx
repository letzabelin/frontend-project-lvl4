// @ts-check

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Chat, Login, Signup } from './containers/index.js';

const NotFoundPage = () => <div>page not found</div>;

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Chat />
      </Route>
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
);

export default App;
