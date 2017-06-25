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
    <div className="container">
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
            hintText="your password"
            name="password"
            value={props.user.password}
            onChange={props.onchange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <RaisedButton
            label="Login"
            primary={style}
            onClick={props.userLog}
          />
          <RaisedButton label="Cancel" secondary={style} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <b>Create account:<Link to='/signup'>SignUp</Link></b>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
);

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  toggleLog: PropTypes.object.isRequired,
  onchange: PropTypes.func.isRequired,
  userLog: PropTypes.func.isRequired,
  logCancel: PropTypes.func.isRequired
};

export default LoginForm;
