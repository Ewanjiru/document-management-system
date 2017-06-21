import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import SignUpForm from './SignUpForm';
import { SignUpAction } from '../../actions/SignUpAction';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    } };
    this.userRegister = this.userRegister.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  onchange(event) {
    const label = event.target.name;
    this.state.user[label] = event.target.value;
    this.setState({
      user: this.state.user
    });
  }

  onCancel(event) {
    return true;
  }

  userRegister(event) {
    event.preventDefault();
    const profile = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
  }

  render() {
    return (
      <div>
        <SignUpForm
          user={this.state.user}
          onchange={this.onchange}
          userRegister={this.userRegister}
        />
      </div>
    );
  }
}

export default SignUp;
