import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const style = {
  margin: 12,
};

function LoginForm() {
  <MuiThemeProvider id="wrapper">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <TextField hintText="your email" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <TextField hintText="your password" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <RaisedButton label="Login" primary={style} />
          <RaisedButton label="Cancel" secondary={style} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <b>Create account:</b> <Link to="/signup" className="active"> signup </Link>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
}

export default LoginForm;
