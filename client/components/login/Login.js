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
    this.props.actions.LoginAction(this.state.user).then(() => {
      const message = this.props.error.error;
      const array = message.split(' ');
      if (array[0] === 'Error:') {
        this.showNotification(this.props.error.error);
      }
    });
  }

  showNotification(error) {
    this.refs.notificator.error(' ', error, 4000);
  }

  render() {
    return (
      <div className="logWrapper">
        <div>
          <ReactNotify ref="notificator" />
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
  error: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    error: state.error,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
