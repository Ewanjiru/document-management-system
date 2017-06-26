import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './ViewDocuments';
import Header from '../common/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as DocumentActions from '../../actions/DocumentsAction';
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
    return (
      <div className="mainframe">
        <Header />
        <ul className="nav nav-pills">
          <li role="presentation" className="active"><a href="/edocx/documents">All Documents</a></li>
          <li role="presentation"><a href="/edocx/documents/mydocuments">My Documents</a></li>
          <li role="presentation"><a href="/edocx/documents/newdocument">New Document</a></li>
          <li role="presentation"><a href="/edocx/documents/search">Search</a></li>
        </ul>
        <MuiThemeProvider>
          <View
            documents={this.state.documents}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Documents.propTypes = {
  actions: PropTypes.object.isRequired
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

