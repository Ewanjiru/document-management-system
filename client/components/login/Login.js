import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import LoginForm from './LoginForm';
import * as SignUpActions from '../../actions/SignUpAction';
import '../home/Home.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      }
    };
    this.userLog = this.userLog.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  onchange(event) {
    const label = event.target.name;
    this.state.user[label] = event.target.value;
    return this.setState({
      user: this.state.user
    });
  }

  logCancel() {
    return this.setState({
    });
  }

  userLog(event) {
    event.preventDefault();
    this.props.actions.LoginAction(this.state.user);
  }
  render() {
    return (
      <div className="logWrapper">
        <LoginForm
          user={this.state.user}
          onchange={this.onchange}
          userLog={this.userLog}
          logCancel={this.logCancel}
        />
      </div>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
