import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PropTypes from 'react-proptypes';
import SignUpForm from './SignUpForm';
import ReactNotify from 'react-notify';
import * as SignUpActions from '../../actions/SignUpAction';
import '../home/Home.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleType: 'support engineer'
      },
      error: props.error,
    };
    this.userRegister = this.userRegister.bind(this);
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

  logCancel(event) {
    event.preventDefault();
    const label = event.target.name;
    this.state.user[label] = event.target.value;
    return this.setState({
    });
  }

  userRegister(event) {
    event.preventDefault();
    this.props.actions.SignUpAction(this.state.user).then(() => {
      console.log('error', this.props.error.error);
      if (this.props.error.error) {
        this.showNotification(this.props.error.error);
      } else {
        browserHistory.push('/');
      }
    });
  }

  showNotification(error) {
    this.refs.notificator.error('', error, 4000);
    // this.refs.notificator.success("Title.", "Msg - body.", 4000);
  }

  render() {
    return (
      <div className="mainframe">
        <div className="header">
          <h2>Welcome To eDocz Document Management System</h2>
        </div>
        <div className="signups">
          <div id="logWrapper">
            <div>
              <ReactNotify ref="notificator" />
            </div>
            <SignUpForm
              user={this.state.user}
              onchange={this.onchange}
              userRegister={this.userRegister}
              logCancel={this.logCancel}
            />
          </div>
        </div>
      </div>
    );
  }
}
SignUp.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}
function mapStateToProps(state) {
  console.log(state.error, 'ooooo');
  return {
    state,
    error: state.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
