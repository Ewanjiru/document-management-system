import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import * as RoleActions from '../../actions/RoleActions';
import '../documents/Document.scss';

class ViewRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      role: this.props.roles,

    };
    console.log('state', this.state.role);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    console.log('I was called');
    this.props.actions.loadRoles();
    console.log("props after loading ", this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { roles } = nextProps;
    if (roles) {
      this.setState({ role: roles.role });
    }
  }

  handleDelete(id) {
    console.log("delete user id number ", id);
    this.props.actions.deleteRole(id);
  }

  render() {
    console.log("Roles are: ", this.props.roles);
    return (
      <div className="wrapper">
        <Card>
          <Table>
            <TableHeader>
              <TableRow >
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                this.props.roles.map(arole =>
                  (
                    <div>
                      <TableRow key={arole.id}>
                        <TableRowColumn>{arole.id}</TableRowColumn>
                        <TableRowColumn>{arole.role}</TableRowColumn>
                      </TableRow>
                    </div>)
                )}
            </TableBody>
          </Table>
        </Card>
      </div>
    );
  }
}
ViewRoles.propTypes = {
  roles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};
ViewRoles.defaultProps = {
  roles: []
};
function mapStateToProps(state) {
  console.log('my users', state.roles.roles);
  return {
    roles: state.roles.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RoleActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewRoles);
