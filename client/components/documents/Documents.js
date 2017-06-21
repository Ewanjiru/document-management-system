import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as docActions from '../../actions/DocumentsAction';
import Content from './MainDiv';
import SideBar from './SideBar';
import Header from '../common/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Documents';

class Documents extends React.Component {
  render() {
    return (
      <div className="mainframe">
        <Header />
        <MuiThemeProvider>
          <SideBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Content />
        </MuiThemeProvider>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents
  };
}
export default connect(mapStateToProps)(Documents);

