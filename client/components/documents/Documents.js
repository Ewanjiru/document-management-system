import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './ViewDocuments';
import Header from '../common/Header';
import SubHeader from '../common/SubHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
        <SubHeader role={role} />
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

