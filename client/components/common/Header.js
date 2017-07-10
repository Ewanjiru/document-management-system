import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import authenticate from '../../api/helper';
import * as SignUpActions from '../../actions/SignUpAction';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.actions.LogoutAction(sessionStorage.Token);
  }

  render() {
    const role = authenticate(sessionStorage.Token).roleType;
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
                        WebSiteName
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/edocx/documents"> Documents </Link></li>
            <li><Link to="/edocx/users" activeClassName="active"> Users </Link></li>
            {role === 'admin' &&
            <li><Link to="/edocx/roles" activeClassName="active"> Roles</Link></li>
						}
          </ul>
          <ul className="nav navbar-nav navbar-right">
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
