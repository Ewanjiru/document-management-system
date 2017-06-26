import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/home/Home';
import Documents from './components/documents/Documents';
import Users from './components/users/Users';
import SignUp from './components/login/SignUp';
import About from './components/about/About';
import Search from './components/documents/Search';
import MyDocuments from './components/documents/MyDocuments';
import CreateForm from './components/documents/CreateForm';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/edocx/documents" component={Documents} />
    <Route path="/edocx/documents/mydocuments" component={MyDocuments} />
    <Route path="/edocx/documents/newdocument" component={CreateForm} />
    <Route path="/edocx/documents/search" component={Search} />
    <Route path="/edocx/users" component={Users} />
    <Route path="/edocx/about" component={About} />
    <Route path="/edocx/signup" component={SignUp} />
  </Route>
);

