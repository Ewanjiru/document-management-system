import React from 'react';
import PropTypes from 'react-proptypes';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PasswordField from 'material-ui-password-field';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: 12,
};

const LoginForm = props => (
  <MuiThemeProvider id="logWrapper">
    <form>
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
          hintText="your password"
          name="password"
          value={props.user.password}
          onChange={props.onchange}
          fullWidth
        />
      </div>
      <div className="row">
        <RaisedButton
          name="login"
          label="Login"
          primary={style}
          onClick={props.userLog}
        />
        <RaisedButton label="Cancel" secondary={style} onClick={props.logCancel} />
      </div>
      <div className="row">
        <b>Create account:<Link to="/edocx/signup" name="signup">SignUp</Link></b>
      </div>
    </form>
  </MuiThemeProvider>
);

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onchange: PropTypes.func.isRequired,
  userLog: PropTypes.func.isRequired,
  logCancel: PropTypes.func.isRequired
};

export default LoginForm;
