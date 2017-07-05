import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import authenticate from '../../api/helper';
import * as UserActions from '../../actions/UserAction';
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
      }
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenView = this.handleOpenView.bind(this);
    this.onchange = this.onchange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.countUsers.then(this.props.actions.loadUsers());
  }

  componentWillReceiveProps(nextProps) {
    const { byId } = nextProps.users;

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
    this.props.actions.viewUser(id);
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.actions.editUser(this.state.id, this.state.edit);
    this.setState({ openView: false, openEdit: false, edit: { firstName: '', lastName: '', email: '', roleType: '' } });
  }

  handleClose() {
    this.setState({ openView: false, openEdit: false });
  }

  handleOpenView(id) {
    this.setState({ id, openView: true });
    this.props.actions.viewUser(id);
  }

  handleDelete(id) {
    this.props.actions.deleteUser(id);
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.loadUsers(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }

  handleSearchChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  handleSearch() {
    console.log(this.state.searchText);
    this.props.actions.searchUser(this.state.searchText);
  }

  render() {
    const items = this.props.count;
    const itemsCount = Object.keys(items).map(key => items[key]);
    const role = authenticate(sessionStorage.Token).roleType;
    const { searchText } = this.state;
    let filteredUsers;
    if (searchText === '') {
      filteredUsers = this.props.users.all;
    } else {
      filteredUsers = this.props.users.all.filter(users => users.firstName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1);
    }
    console.log('my filteredDocuments', filteredUsers);
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
              <CardTitle>
                <TextField
                  name="firstName"
                  id="edit"
                  value={this.state.edit.firstName}
                  onChange={this.onchange}
                />
              </CardTitle>
              <CardHeader>
                <TextField
                  name="lastName"
                  id="edit"
                  value={this.state.edit.lastName}
                  onChange={this.onchange}
                />
              </CardHeader>
              <CardText>
                <TextField
                  name="email"
                  value={this.state.edit.email}
                  onChange={this.onchange}
                />
              </CardText>
              <CardHeader>
                <TextField
                  name="roleType"
                  id="edit"
                  value={this.state.edit.roleType}
                  onChange={this.onchange}
                />
              </CardHeader>
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
          <input type="text" name="search" className="searchField" placeholder="search user by firstName" onChange={this.handleSearchChange} /><RaisedButton Primary>search</RaisedButton>
          <Table>
            <TableHeader>
              <TableRow >
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Date Added</TableHeaderColumn>
                <TableHeaderColumn>Role</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                filteredUsers.map(auser =>
                  (<TableRow key={auser.id}>
                    <TableRowColumn>{auser.firstName}</TableRowColumn>
                    <TableRowColumn>{auser.lastName}</TableRowColumn>
                    <TableRowColumn>{auser.email}</TableRowColumn>
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
              // prevPageText="prev"
              // nextPageText="next"
              activePage={this.state.activePage}
              itemsCountPerPage={7}
              totalItemsCount={itemsCount[0]}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
        </Card>
      </div>
    );
  }
}
ViewUsers.propTypes = {
  count: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log('my users', state.users);
  return {
    users: state.users,
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);
