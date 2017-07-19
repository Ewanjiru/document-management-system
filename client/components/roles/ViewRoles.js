import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import ReactNotify from 'react-notify';
import { Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import * as RoleActions from '../../actions/RoleActions';
import '../documents/Document.scss';

export class ViewRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      role: this.props.roles,
      error: this.props.error
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadRoles();
  }

  componentWillReceiveProps(nextProps) {
    const { roles } = nextProps;
    const { error } = nextProps;
    if (roles) {
      this.setState({ role: roles.role });
    } else {
      this.setState({ error: error.error });
    }
  }

  handleDelete(id) {
    this.props.actions.deleteRole(id).then(() => {
      this.showNotification(this.props.error.error);
      window.location.reload();
    });
  }

  showNotification(error) {
    const array = error.split(' ');
    if (array[0] === 'Error:') {
      this.refs.notificator.error(' ', error, 10000);
    } else {
      this.refs.notificator.success(' ', error, 10000);
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Card>
          <div>
            <ReactNotify ref="notificator" />
          </div>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow >
                <TableHeaderColumn>Role Id</TableHeaderColumn>
                <TableHeaderColumn>Role Name</TableHeaderColumn>
              </TableRow>
              {
                this.props.roles.map(arole =>
                  (
                    <TableRow key={arole.id}>
                      <TableRowColumn>{arole.id}</TableRowColumn>
                      <TableRowColumn>{arole.role}</TableRowColumn>
                      <TableRowColumn>
                        {arole.role !== 'admin' && arole.role !== 'support engineer' &&
                          <RaisedButton
                            onClick={() => this.handleDelete(arole.id)}
                            primary
                          >Delete</RaisedButton>
                        }
                      </TableRowColumn>
                    </TableRow>
                  )
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
  actions: PropTypes.object.isRequired,
  error: PropTypes.String
};
ViewRoles.defaultProps = {
  roles: []
};
function mapStateToProps(state) {
  return {
    roles: state.roles,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RoleActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewRoles);
