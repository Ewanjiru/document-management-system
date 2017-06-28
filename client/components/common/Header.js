import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as SignUpActions from '../../actions/SignUpAction';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.actions.LogoutAction(sessionStorage.Token);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            WebSiteName
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/edocx/documents"> Documents </Link></li>
            <li><Link to="/edocx/users" activeClassName="active"> Users </Link></li>
            <li><Link to="/edocx/about" activeClassName="active"> About</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/edocx/users" activeClassName="active"><span className="glyphicon glyphicon-user" /></Link></li>
            <li><a href="/"><span className="glyphicon glyphicon-log-in" onClick={this.logout} /> Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}

export default connect(mapDispatchToProps)(Header);
