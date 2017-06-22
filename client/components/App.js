import React, { PropTypes } from 'react';
import Home from './home/Home';

class App extends React.Component {
  render() {
    return (
      <div className="mainframe" >
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired
}
export default App;
