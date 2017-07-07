import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/home/Home';
import Documents from './components/documents/Documents';
import Users from './components/users/Users';
import SignUp from './components/login/SignUp';
import Roles from './components/roles/Roles';
import MyDocuments from './components/documents/MyDocuments';
import RoleBased from './components/documents/RoleBased';
import CreateForm from './components/documents/CreateForm';
import CreateRole from './components/roles/CreateRole';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/edocx/documents" component={Documents} />
    <Route path="/edocx/documents/mydocuments" component={MyDocuments} />
    <Route path="/edocx/documents/roledocuments" component={RoleBased} />
    <Route path="/edocx/documents/newdocument" component={CreateForm} />
    <Route path="/edocx/users" component={Users} />
    <Route path="/edocx/roles" component={Roles} />
    <Route path = "/edocx/new" component={CreateRole} />
    <Route path="/edocx/signup" component={SignUp} />
  </Route>
);

