import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PasswordField from 'material-ui-password-field';
import { SignUpAction } from '../../actionCreators/SignUpAction';

const style = {
  margin: 12,
};
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.userRegister = this.userRegister.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  onchange() {
    this.setState({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
  }
  userRegister(event) {
    event.preventDefault();
    const profile = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    SignUpAction(profile);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <TextField hintText="your firstname" defaultValue={this.state.firstName} onChange={this.onchange()} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <TextField hintText="your lastname" defaultValue={this.state.lastName} onChange={this.onchange()} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <TextField hintText="your email" defaultValue={this.state.email} onChange={this.onchange()} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <PasswordField floatingLabelText="your password" defaultValue={this.state.password} onChange={this.onchange()} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <RaisedButton label="Register" primary style={style} onClick={this.userRegister()} />
            <button onClick={this.userRegister()}>test</button>
            <RaisedButton label="Cancel" secondary style={style} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" />
        </div>
      </div>
    );
  }
}

export default SignUp;
