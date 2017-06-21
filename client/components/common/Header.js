import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Header = () => (
  <nav>
    <Link to="/documents" activeClassName="active"> Documents </Link>
    {' | '}
    <Link to="/users" activeClassName="active"> Users </Link>
    {' | '}
    <Link to="/about" activeClassName="active"> About</Link>
  </nav>
);
export default Header;
