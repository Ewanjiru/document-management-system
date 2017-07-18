import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import ReactNotify from 'react-notify';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import authenticate from '../../api/helper';
import * as UserActions from '../../actions/UserAction';
import * as RoleActions from '../../actions/RoleActions';
import '../documents/Document.scss';

class ViewUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsCount: props.count,
      id: '',
      openView: false,
      openEdit: false,
      searchText: '',
      limit: 7,
      users: props.users,
      userById: [],
      activePage: 1,
      edit: {
        firstName: '',
        lastName: '',
        email: '',
        roleType: ''
      },
      roles: [],
      error: this.props.error
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenView = this.handleOpenView.bind(this);
    this.onchange = this.onchange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  componentWillMount() {
    this.props.actions.userActions.countUsers().then(() => {
      this.props.actions.userActions.loadUsers();
      this.showNotification(this.props.error);
    });
    this.props.actions.roleActions.loadRoles();
    this.setState({
      roles: this.props.roles
    });
  }

  componentWillReceiveProps(nextProps) {
    const { byId } = nextProps.users;
    const { all } = nextProps.users;

    if (byId) {
      this.setState({
        edit: {
          firstName: byId.firstName,
          lastName: byId.lastName,
          email: byId.email,
          roleType: byId.roleType
        }
      });
    }
    this.setState({
      users: all
    });
  }

  onchange(event) {
    const label = event.target.name;
    const edit = this.state.edit;
    edit[label] = event.target.value;

    this.setState({
      edit: Object.assign({}, this.state.edit, edit)
    });
  }

  handleOpen(id) {
    this.setState({ id, openEdit: true });
    this.props.actions.userActions.viewUser(id);
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.actions.userActions.editUser(this.state.id, this.state.edit);
    //window.location.reload();
    this.showNotification(this.props.error.error);
    this.setState({ openView: false, openEdit: false, edit: { firstName: '', lastName: '', email: '', roleType: '' } });
  }

  handleClose() {
    this.setState({ openView: false, openEdit: false });
  }

  handleOpenView(id) {
    this.setState({ id, openView: true });
    this.props.actions.userActions.viewUser(id);
  }

  handleDelete(id) {
    if (id === 1) {
      this.showNotification('Admin cannot be deleted');
    } else {
      this.props.actions.userActions.deleteUser(id).then(() => {
        window.location.reload();
        this.showNotification(this.props.error.error);
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.userActions.loadUsers(
      this.state.limit, (this.state.limit * (pageNumber - 1)));
  }

  handleSearchChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  handleSearch() {
    this.props.actions.userActions.searchUser(this.state.searchText).then(() => {
      this.showNotification(this.props.error.error);
    });
  }

  showNotification(error) {
    const array = error.split(' ');
    if (array[0] === 'Error:') {
      this.refs.notificator.error(' ', error, 3000);
    } else {
      this.refs.notificator.success(' ', error, 3000);
    }
  }

  render() {
    let items;
    let itemsCount;
    const role = authenticate(sessionStorage.Token).roleType;
    const { searchText } = this.state;
    let filteredUsers;
    if (searchText === '') {
      items = this.props.count;
      itemsCount = Object.keys(items).map(key => items[key]);
      filteredUsers = this.props.users.all;
    } else {
      items = this.state.users.length;
      itemsCount = [items];
      filteredUsers = this.state.users;
    }
    const actions = [
      <FlatButton
        label="Edit"
        primary
        keyboardFocused
        onTouchTap={this.handleEdit}
      />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
    ];
    const actions2 = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary
        onTouchTap={() => this.handleDelete(this.state.id)}
      />
    ];

    const styles = {
      TableRowColumn: {
        width: 35,
        margin: '20px auto 0',
      }
    };

    return (
      <div className="wrapper">
        <div>
          <Dialog
            title="Edit Document"
            actions={actions}
            modal={false}
            open={this.state.openEdit}
            onRequestClose={this.handleClose}
            autoScrollBodyContent
          >
            <Card id="card2">
              <form name='editform'>
                <CardText>
                  <label>FirstName </label>
                </CardText>
                <CardText>
                  <TextField
                    name="firstName"
                    id="edit"
                    value={this.state.edit.firstName}
                    onChange={this.onchange}
                  />
                </CardText>
                <CardText>
                  <label>LastName </label>
                </CardText>
                <CardText>
                  <TextField
                    name="lastName"
                    id="edit"
                    value={this.state.edit.lastName}
                    onChange={this.onchange}
                  />
                </CardText>
                <CardText>
                  <label>Email </label>
                </CardText>
                <CardText>
                  <TextField
                    name="email"
                    value={this.state.edit.email}
                    onChange={this.onchange}
                  />
                </CardText>
                <CardText>
                  <label>Role </label>
                </CardText>
                <CardText>
                  <select value={this.state.edit.roleType} name="roleType" onChange={this.onchange}>
                    {
                      this.props.roles.map(arole => (
                        <option key={arole.id} value={arole.role}>{arole.role}</option>
                      ))
                    };
                  </select>
                </CardText>
              </form>
            </Card>
          </Dialog>
        </div>

        <div>
          <Dialog
            actions={actions2}
            modal={false}
            open={this.state.openView}
            onRequestClose={this.handleClose}
            autoScrollBodyContent
          >
            <Card>
              <CardText>
                {`${this.props.users.byId.firstName}  
                ${this.props.users.byId.lastName}`}
                {this.props.users.byId.email}
                {this.props.users.byId.roleType}
              </CardText>
            </Card>
          </Dialog>
        </div>

        <Card>
          <input type="text" name="search" className="searchField" placeholder="search by title" onChange={this.handleSearchChange} /><RaisedButton Primary onClick={this.handleSearch}>Search</RaisedButton>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow >
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Date Added</TableHeaderColumn>
                <TableHeaderColumn>Role</TableHeaderColumn>
              </TableRow>
              {
                filteredUsers.map(auser =>
                  (<TableRow key={auser.id}>
                    <TableRowColumn>{auser.firstName}</TableRowColumn>
                    <TableRowColumn>{auser.lastName}</TableRowColumn>
                    <TableRowColumn style={styles.TableRowColumn}>{auser.email}</TableRowColumn>
                    <TableRowColumn>{auser.createdAt}</TableRowColumn>
                    <TableRowColumn>{auser.roleType}</TableRowColumn>
                    <TableRowColumn>
                      {role === 'admin' &&
                        <RaisedButton
                          onClick={() => this.handleDelete(auser.id)}
                          primary
                        >Delete</RaisedButton>
                      }
                    </TableRowColumn>
                    <TableRowColumn>
                      {role === 'admin' &&
                        <RaisedButton
                          onClick={() => this.handleOpen(auser.id)}
                          primary
                        >Edit</RaisedButton>
                      }
                    </TableRowColumn>
                  </TableRow>)
                )}
            </TableBody>
          </Table>
          <div className="pages">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={7}
              totalItemsCount={itemsCount[0]}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
          <div>
            <ReactNotify ref="notificator" />
          </div>
        </Card>
      </div>
    );
  }
}

ViewUsers.propTypes = {
  count: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  error: PropTypes.array,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log('this error', state.error);
  return {
    users: state.users,
    count: state.count,
    roles: state.roles,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      userActions: bindActionCreators(UserActions, dispatch),
      roleActions: bindActionCreators(RoleActions, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);
