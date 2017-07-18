import React from 'react';
import Login from '../login/Login';
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
    return (
      <div className="mainframe">
        <div className="header">
          <h2>Welcome To eDocz Document Management System</h2>
        </div>
        <Login />
      </div>
    );
  }
}

export default Home;

