import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
// import toastr from 'toastr';
import { Card, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import authenticate from '../../api/helper';
import * as DocumentActions from '../../actions/DocumentsAction';
import './Document.scss';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsCount: 0,
      id: '',
      docOwner: '',
      openView: false,
      openEdit: false,
      searchText: '',
      documents: props.documents,
      errors: props.error,
      documentById: [],
      activePage: 1,
      limit: 7,
      edit: {
        title: '',
        content: '',
        access: '',
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
    console.log('lenth', this.state.itemCounts);
  }

  componentWillMount() {
    this.props.actions.loadAllDocuments().then(
      this.setState({
        itemsCount: this.props.documents.all.length
      })
    );
  }

  componentDidMount() {
    this.props.actions.loadDocuments();
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
    this.props.actions.editDocument(this.state.id, this.state.edit);
    this.setState({ openView: false, openEdit: false, edit: { title: '', content: '', access: '' } });
  }

  handleClose() {
    this.setState({ openView: false, openEdit: false });
  }

  handleOpenView(id, owner) {
    this.setState({ id, docOwner: owner, openView: true });
    this.props.actions.viewDocument(id);
  }

  handleDelete(id) {
    this.props.actions.deleteDocument(this.state.id);
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
    console.log(this.state.searchText);
    this.props.actions.searchDocument(this.state.searchText);
  }

  render() {
    console.log(this.state.itemsCount);
    console.log('i will happen', this.props.documents.all.length);
    const role = authenticate(sessionStorage.Token).roleId;
    const { searchText } = this.state;
    let filteredDocuments;
    if (searchText === '') {
      filteredDocuments = this.props.documents.all;
    } else {
      filteredDocuments = this.props.documents.all.filter(documents => documents.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1);
    }
    console.log('my filteredDocuments', this.props.documents.all);
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
        disabled={role != 1}
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
            <Card>
              <CardTitle id="card">
                <TextField
                  name="title"
                  id="edit"
                  value={this.state.edit.title}
                  onChange={this.onchange}
                  fullWidth
                />
              </CardTitle>
              <CardHeader>
                Access Type:
            <select name="access" id="acces" value={this.state.edit.access} onChange={this.onchange}>
                  <option value="" />
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </CardHeader>
              <CardText>
                <textarea
                  name="content"
                  id="textarea"
                  rows="22"
                  cols="120"
                  value={this.state.edit.content}
                  onChange={this.onchange}
                />
              </CardText>
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
              <CardTitle title={`${this.props.documents.byId.title} by ${this.props.documents.byId.userId}`} />
              <CardText>
                {this.props.documents.byId.content}
              </CardText>
            </Card>
          </Dialog>
        </div>

        <Card>
          <input type="text" name="search" className="searchField" placeholder="search by title" onChange={this.handleSearchChange} />
          <Table>
            <TableHeader>
              <TableRow >
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Access Type</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
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

                      {role === 1 &&
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
              totalItemsCount={20}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
        </Card>
      </div>
    );
  }
}
View.propTypes = {
  documents: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log('state', state.documents);
  return {
    documents: state.documents,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(View);