import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import View from './ViewDocuments';
import Header from '../common/Header';
import * as DocumentActions from '../../actions/DocumentsAction';
import authenticate from '../../api/helper';

import './Documents';

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: {
        title: '',
        content: '',
        access: '',
        userId: sessionStorage.Token
      },
    };
  }

  render() {
    const role = authenticate(sessionStorage.Token).roleType;
    return (
      <div className="mainframe">
        <Header />
        <ul className="nav nav-pills" >
          <li role="presentation" className="active"><Link to="/edocx/documents">All Documents</Link></li>
          <li role="presentation"><Link to="/edocx/documents/mydocuments" name="mine">My Documents</Link></li>
          <li role="presentation"><Link to="/edocx/documents/roledocuments">{role} Documents</Link></li>
          <li role="presentation"><Link to="/edocx/documents/newdocument" name="new">New Document</Link></li>
        </ul>
        <MuiThemeProvider>
          <View />
        </MuiThemeProvider>
      </div>
    );
  }
}

Documents.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);

