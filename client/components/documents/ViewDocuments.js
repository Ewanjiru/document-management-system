import React from 'react';
import PropTypes from 'react-proptypes';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import ReactNotify from 'react-notify';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import authenticate from '../../api/helper';
import * as DocumentActions from '../../actions/DocumentsAction';
import './Document.scss';
import '../common/notification.scss';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsCount: props.count,
      id: '',
      docOwner: '',
      openView: false,
      openEdit: false,
      searchText: '',
      documents: Object.assign([], props.documents.all),
      documentById: [],
      activePage: 1,
      limit: 7,
      edit: {
        title: '',
        content: '',
        access: '',
      },
      role: '',
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
    this.update = this.update.bind(this);
  }


  componentWillMount() {
    this.props.actions.countDocuments().then(
      this.props.actions.loadDocuments().then(() => {
        this.showNotification(this.props.error.error.response.data.message);
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    const { byId } = nextProps.documents;
    const { all } = nextProps.documents;

    if (byId) {
      this.setState({
        edit: {
          title: byId.title,
          content: byId.content,
          access: byId.access,
        }
      });
    }
    this.setState({
      documents: all
    });
  }

  update() {
    this.props.actions.countDocuments().then(
      this.props.actions.loadDocuments().then(() => {
        this.showNotification(this.props.error.error.response.data.message);
      })
    );
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
    this.props.actions.viewDocument(id);
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.actions.editDocument(this.state.id, this.state.edit).then(() => {
      this.showNotification(this.props.error.error);
    });
    window.location.reload();
    this.setState({ openView: false, openEdit: false, edit: { title: '', content: '', access: '' } });
  }

  handleClose() {
    this.setState({ openView: false, openEdit: false });
  }

  handleOpenView(id, owner) {
    this.setState({ id, docOwner: owner, openView: true });
    this.props.actions.viewDocument(id);
  }

  handleDelete() {
    this.props.actions.deleteDocument(this.state.id).then(() => {
      this.handleClose();
      this.showNotification(this.props.error.error);
      window.location.reload();
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.loadDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }

  handleSearchChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  handleSearch() {
    this.props.actions.searchDocument(this.state.searchText).then(() => {
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
    let filteredDocuments;
    if (searchText === '') {
      items = this.props.count;
      itemsCount = Object.keys(items).map(key => items[key]);
      filteredDocuments = this.state.documents;
    } else {
      items = this.state.documents.length;
      itemsCount = [items];
      filteredDocuments = this.state.documents;
    }
    const actions = [
      <FlatButton
        label="Edit"
        primary
        keyboardFocused
        onTouchTap={this.handleEdit}
        disabled={!this.state.edit.title || !this.state.edit.content || !this.state.edit.access}
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
        disabled={role !== 'admin'}
      />
    ];
    return (
      <div className="wrapper">

        <Dialog
          title="Edit Document"
          actions={actions}
          modal={false}
          open={this.state.openEdit}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <Card>
            <form id="viewDocs">
              <div className="row">
                <label>Document Title</label>
                <CardTitle id="card">
                  <TextField
                    name="title"
                    id="edit"
                    value={this.state.edit.title}
                    onChange={this.onchange}
                    fullWidth
                  />
                </CardTitle>
              </div>
              <div className="row">
                <label>Access Type:</label>
                <CardTitle>
                  <select name="access" id="acces" value={this.state.edit.access} onChange={this.onchange}>
                    <option value="">choose..</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value={role}>Role Based</option>
                  </select>
                </CardTitle>
              </div>
              <div className="row">
                <label>Content</label>
                <CardTitle>
                  <textarea
                    name="content"
                    id="textarea"
                    rows="22"
                    value={this.state.edit.content}
                    onChange={this.onchange}
                  />
                </CardTitle>
              </div>
            </form>
          </Card>
        </Dialog>

        <div>
          <Dialog
            actions={actions2}
            modal={false}
            open={this.state.openView}
            onRequestClose={this.handleClose}
            autoScrollBodyContent
          >
            <Card>
              <CardTitle title={`${this.props.documents.byId.title} by ${this.props.documents.byId.userId}`} />
              <CardText>
                {this.props.documents.byId.content}
              </CardText>
            </Card>
          </Dialog>
        </div>
        <Card>
          <input type="text" name="search" className="searchField" placeholder="search by title" onChange={this.handleSearchChange} /><RaisedButton Primary name="search" onClick={this.handleSearch}>Search</RaisedButton>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow >
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Access Type</TableHeaderColumn>
              </TableRow>
              {
                filteredDocuments.map(adocument =>
                  (<TableRow key={adocument.id}>
                    <TableRowColumn>{adocument.title}</TableRowColumn>
                    <TableRowColumn>{adocument.access}</TableRowColumn>
                    <TableRowColumn>

                      <RaisedButton
                        onClick={() => this.handleOpenView(adocument.id)}
                        primary
                      >View</RaisedButton>

                      {role === 'admin' &&
                        <RaisedButton
                          onClick={() => this.handleOpen(adocument.id)}
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
View.propTypes = {
  count: PropTypes.object.isRequired,
  documents: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  error: PropTypes.object
};

function mapStateToProps(state) {
  console.log('the errororoororo', state.error);
  return {
    documents: state.documents,
    count: state.count,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(View);
