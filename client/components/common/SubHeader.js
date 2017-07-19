import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SubHeader = props => (
  <ul className="nav nav-pills" >
    <li role="presentation"><Link to="/edocx/documents">All Documents</Link></li>
    <li role="presentation"><Link to="/edocx/documents/mydocuments" name="mine">My Documents</Link></li>
    <li role="presentation"><Link to="/edocx/documents/roledocuments">{props.role} Documents</Link></li>
    <li role="presentation"><Link to="/edocx/documents/newdocument" name="new">New Document</Link></li>
  </ul>
);

SubHeader.propTypes = {
  role: PropTypes.object.isRequired
};

export default SubHeader;
