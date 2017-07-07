import React from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactNotify from 'react-notify';
import TextField from 'material-ui/TextField';
import * as RoleActions from '../../actions/RoleActions';
import Header from '../common/Header';
import '../documents/Document.scss';

export class CreateRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: {
        role: ''
      }
    };
    this.create = this.create.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  onchange(event) {
    const label = event.target.name;
    this.state.roles[label] = event.target.value;
    return this.setState({
      roles: this.state.roles,
    });
  }

  create(event) {
    event.preventDefault();
    this.props.actions.newRole(this.state.roles).then(this.showNotification());
    this.setState({
      roles: {
        role: ''
      }
    });
  }

  showNotification() {
    this.refs.notificator.success('doc created.', 'Successfully created', 4000);
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <ul className="nav nav-pills">
          <li role="presentation"><a href="/edocx/roles">All Roles</a></li>
          <li role="presentation" className="active"><a href="/edocx/new">Create Roles</a></li>
        </ul>
        <MuiThemeProvider>
          <Card>
            <div>
              <ReactNotify ref="notificator" />
            </div>
            <CardText>
              <TextField
                hintText="role type"
                name="role"
                value={this.state.roles.role}
                onChange={this.onchange}
                fullWidth
              />
            </CardText>
            <CardActions>
              <RaisedButton
                id="submit"
                label="Create"
                secondary
                onClick={this.create}
              />
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

CreateRole.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    roles: state.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RoleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole);

