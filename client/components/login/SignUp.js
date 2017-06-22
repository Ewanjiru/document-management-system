import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PropTypes from 'react-proptypes';
import SignUpForm from './SignUpForm';
import * as SignUpActions from '../../actions/SignUpAction';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: 1
    } };
    this.userRegister = this.userRegister.bind(this);
    this.onchange = this.onchange.bind(this);
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
      browserHistory.push('/');
    });
  }

  render() {
    return (
      <div id="logWrapper">
        <SignUpForm
          user={this.state.user}
          onchange={this.onchange}
          userRegister={this.userRegister}
          logCancel={this.logCancel}
        />
      </div>
    );
  }
}
SignUp.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}
function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
