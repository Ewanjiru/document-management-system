import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../common/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ViewRoles from './ViewRoles';
import * as RoleActions from '../../actions/RoleActions';
import '../documents/Document.scss';

class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: {
        role: '',
        userId: sessionStorage.Token
      },
    };
  }

  render() {
    return (
      <div className="mainframe">
        <Header />
        <ul className="nav nav-pills">
          <li role="presentation" className="active"><a href="/edocx/roles">All Roles</a></li>
          <li role="presentation"><a href="/edocx/new">Create Roles</a></li>
        </ul>
        <MuiThemeProvider>
          <ViewRoles />
        </MuiThemeProvider>
      </div>
    );
  }
}

Roles.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    roles: state.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RoleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);

