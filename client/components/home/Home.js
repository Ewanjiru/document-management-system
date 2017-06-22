import React from 'react';
import PropTypes from 'react-proptypes';
import Login from '../login/Login';
import SignUp from '../login/SignUp';
import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRegistering: false };
    this.renderToggle = this.renderToggle.bind(this);
  }

  renderToggle() {
    this.setState({ isRegistered: !this.state.isRegistered });
  }

  render() {
    // if (this.state.isRegistering) {
    //   return (
    //     <div className="mainframe">
    //       <div className="header">
    //         <h2>Welcome To eDocz Document Management System</h2>
    //       </div>
    //       <div className="signups">
    //         <div className="img">
    //           <SignUp />
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    return (
      <div className="mainframe">
        <div className="header">
          <h2>Welcome To eDocz Document Management System</h2>
        </div>
        <div className="signups">
          <Login />
        </div>
      </div>
    );
  }
}

export default Home;

