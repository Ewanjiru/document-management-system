import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SubHeader = props => (
  <ul className="nav nav-pills" >
    <li role="presentation"><a href="/edocx/documents">All Documents</a></li>
    <li role="presentation"><a href="/edocx/documents/mydocuments" name="mine">My Documents</a></li>
    <li role="presentation"><a href="/edocx/documents/roledocuments">{props.role} Documents</a></li>
    <li role="presentation"><a href="/edocx/documents/newdocument" name="new">New Document</a></li>
  </ul>
);

SubHeader.propTypes = {
  role: PropTypes.object.isRequired
};

export default SubHeader;
