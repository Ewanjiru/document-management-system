import React from 'react';
import PropTypes from 'react-proptypes';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PasswordField from 'material-ui-password-field';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Login.scss';

const style = {
  margin: 12,
};
const SignUpForm = props => (
  <MuiThemeProvider>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <TextField
            hintText="your firstname"
            name="firstName"
            value={props.user.firstName}
            onChange={props.onchange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <TextField
            hintText="your lastname"
            name="lastName"
            value={props.user.lastName}
            onChange={props.onchange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <TextField
            hintText="your email"
            name="email"
            value={props.user.email}
            onChange={props.onchange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <PasswordField
            floatingLabelText="your password"
            name="password"
            value={props.user.password}
            onChange={props.onchange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <RaisedButton
            label="Register"
            primary
            style={style}
            onClick={props.userRegister}
          />
          <RaisedButton
            label="Cancel"
            secondary
            style={style}
            onClick={props.logCancel}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12" />
      </div>
    </div>
  </MuiThemeProvider>
    );

SignUpForm.propTypes = {
  user: PropTypes.object.isRequired,
  onchange: PropTypes.func.isRequired,
  userRegister: PropTypes.func.isRequired,
  logCancel: PropTypes.func.isRequired
};
export default SignUpForm;
