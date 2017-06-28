import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../common/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ViewUsers from './ViewUsers';
import * as UserActions from '../../actions/UserAction';
import '../documents/Document.scss';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        firstName: '',
        lastName: '',
        email: '',
        roleId: '',
        userId: sessionStorage.Token
      },
    };
  }

  render() {
    return (
      <div className="mainframe">
        <Header />
        <ul className="nav nav-pills">
          <li role="presentation" className="active"><a href="/edocx/users">View Users</a></li>
        </ul>
        <MuiThemeProvider>
          <ViewUsers />
        </MuiThemeProvider>
      </div>
    );
  }
}

Users.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

