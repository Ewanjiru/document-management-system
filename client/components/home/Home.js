import React,{ PropTypes } from 'react';
// import PropType from '';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../login/Login';
import SignUp from '../login/SignUp';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRegistered: true };
    this.renderToggle = this.renderToggle.bind(this)  
  }
  renderToggle(){
    this.setState({isRegistered: !this.state.isRegistered});
  }
  render() {
    if (!this.state.isRegistered) {
      return (
        <div className="mainframe">
          <SignUp />
        </div>
      );
    }
    return (
      <div className="mainframe">
        <Login />
      </div>
    );
  }
}

export default Home;

