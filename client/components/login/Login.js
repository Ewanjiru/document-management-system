import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import ReactNotify from 'react-notify';
import LoginForm from './LoginForm';
import * as SignUpActions from '../../actions/SignUpAction';
import '../home/Home.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        error: props.error,
        email: '',
        password: '',
      }
    };
    this.userLog = this.userLog.bind(this);
    this.onchange = this.onchange.bind(this);
    this.showNotification = this.showNotification.bind(this);
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
      user: {
        email: '',
        password: '',
      }
    });
  }

  userLog(event) {
    event.preventDefault();
    this.showNotification()
    this.props.actions.LoginAction(this.state.user);
  }

  showNotification() {
    this.refs.notificator.error("Login failed", "Incorrect credentials", 4000);
    // this.refs.notificator.success("Title.", "Msg - body.", 4000);
  }

  render() {
    console.log('there is an error', this.props.error);
    return (
      <div className="logWrapper">
        <div>
          <ReactNotify ref='notificator' />
        </div>
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
  actions: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    error: state.props,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
