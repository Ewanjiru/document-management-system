import React from 'react';
import PropTypes from 'react-proptypes';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PasswordField from 'material-ui-password-field';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: 12,
};
const SignUpForm = props => (
  <MuiThemeProvider>
    <form>
      <div className="row">
        <TextField
          Required
          hintText="your firstname"
          name="firstName"
          value={props.user.firstName}
          onChange={props.onchange}
          fullWidth
        />
      </div>
      <div className="row">
        <TextField
          Required
          hintText="your lastname"
          name="lastName"
          value={props.user.lastName}
          onChange={props.onchange}
          fullWidth
        />
      </div>
      <div className="row">
        <TextField
          hintText="your email"
          name="email"
          value={props.user.email}
          onChange={props.onchange}
          fullWidth
        />
      </div>
      <div className="row">
        <PasswordField
          floatingLabelText="your password"
          name="password"
          value={props.user.password}
          onChange={props.onchange}
          fullWidth
        />
      </div>
      <div className="row">
        <RaisedButton
          name="sign"
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
    </form>
  </MuiThemeProvider>
);

SignUpForm.propTypes = {
  user: PropTypes.object.isRequired,
  onchange: PropTypes.func.isRequired,
  userRegister: PropTypes.func.isRequired,
  logCancel: PropTypes.func.isRequired
};
export default SignUpForm;
