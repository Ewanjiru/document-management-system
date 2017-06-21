import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/home/Home';
import Documents from './components/documents/Documents';
import Users from './components/users/Users';
import SignUp from './components/login/SignUp';
import About from './components/about/About';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/documents" component={Documents} />
    <Route path="/users" component={Users} />
    <Route path="/about" component={About} />
    <Route path="/signup" component={SignUp} />
  </Route>
);

