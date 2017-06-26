import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import AppBar from 'material-ui/AppBar';
// import FlatButton from 'material-ui/FlatButton';

const Header = () => (
  <nav>
    <Link to="/edocx/documents" activeClassName="active"> Documents </Link>
    {' | '}
    <Link to="/edocx/users" activeClassName="active"> Users </Link>
    {' | '}
    <Link to="/edocx/about" activeClassName="active"> About</Link>
  </nav>
);
export default Header;
