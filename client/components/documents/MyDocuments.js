import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Card, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ReactNotify from 'react-notify';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as DocumentActions from '../../actions/DocumentsAction';
import authenticate from '../../api/helper';
import Header from '../common/Header';
import SubHeader from '../common/SubHeader';
import './Document.scss';

class MyDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsCount: props.count,
      id: '',
      token: sessionStorage.Token,
      openView: false,
      openEdit: false,
      searchText: '',
      documentById: [],
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
  }

  componentDidMount() {
    this.props.actions.countDocuments().then(
      this.props.actions.loadMyDocuments(this.state.token)).then(() => {
        if (this.props.documents.all.length === 0) {
          this.showNotification(this.props.error.error);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const { byId } = nextProps.documents;

    if (byId) {
      this.setState({
        edit: {
          title: byId.title,
          content: byId.content,
          access: byId.access,
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
    this.props.actions.viewDocument(id);
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.actions.editDocument(this.state.id, this.state.edit).then(() => {
      this.showNotification(this.props.error.error);
      this.handleClose();
    });
    window.location.reload();
    this.setState({ openView: false, openEdit: false, edit: { title: '', content: '', access: '' } });
  }

  handleClose() {
    this.setState({ openView: false, openEdit: false });
  }

  handleOpenView(id) {
    this.setState({ id, openView: true });
    this.props.actions.viewDocument(id);
  }

  handleDelete() {
    this.props.actions.deleteDocument(this.state.id);
    this.handleClose();
    window.location.reload().then(() => {
      this.showNotification(this.props.error.error);
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.loadMyDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }

  showNotification(error) {
    const array = error.split(' ');
    if (array[0] === 'Error:') {
      this.refs.notificator.error(' ', error, 4000);
    } else {
      this.refs.notificator.success(' ', error, 4000);
    }
  }

  render() {
    const role = authenticate(sessionStorage.Token).roleType;
    // const items = this.props.count;
    // const itemsCount = Object.keys(items).map(key => items[key]);
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
        name="deletedoc"
        label="Delete"
        primary
        onTouchTap={() => this.handleDelete(this.state.id)}
      />
    ];
    return (
      <div>
        <Header />
        <div className="wrapper">
          <SubHeader role={role} />
          <div>
            <MuiThemeProvider>
              <Dialog
                title="Edit Document"
                actions={actions}
                modal={false}
                open={this.state.openEdit}
                onRequestClose={this.handleClose}
                autoScrollBodyContent
              >
                <Card>
                  <form>
                    <div className="row">
                      <label>Document Title</label>
                      <CardTitle>
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
                        <select name="access" id="acces" style={{ width: '100%' }} value={this.state.edit.access} onChange={this.onchange}>
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
                          rows="10"
                          style={{ width: '100%' }}
                          value={this.state.edit.content}
                          onChange={this.onchange}
                        />
                      </CardTitle>
                    </div>
                  </form>
                </Card>
              </Dialog>
            </MuiThemeProvider>
          </div>

          <div>
            <MuiThemeProvider>
              <Dialog
                actions={actions2}
                modal={false}
                open={this.state.openView}
                onRequestClose={this.handleClose}
                autoScrollBodyContent
              >
                <Card>
                  <CardTitle title={`${this.props.documents.byId.title}`} />
                  <CardText>
                    {this.props.documents.byId.content}
                  </CardText>
                </Card>
              </Dialog>
            </MuiThemeProvider>
          </div>

          <MuiThemeProvider>
            <Card>
              <div>
                <ReactNotify ref="notificator" />
              </div>
              <Table>
                <TableBody displayRowCheckbox={false}>
                  <TableRow >
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>Access Type</TableHeaderColumn>
                  </TableRow>
                  {
                    this.props.documents.all.map(adocument =>
                      (<TableRow key={adocument.id}>
                        <TableRowColumn>{adocument.title}</TableRowColumn>
                        <TableRowColumn>{adocument.access}</TableRowColumn>
                        <TableRowColumn>
                          <RaisedButton
                            name="viewdoc"
                            onClick={() => this.handleOpenView(adocument.id)}
                            primary
                          >View</RaisedButton>
                        </TableRowColumn>
                        <TableRowColumn>
                          <RaisedButton
                            onClick={() => this.handleOpen(adocument.id)}
                            primary
                          >Edit</RaisedButton>
                        </TableRowColumn>
                      </TableRow>)
                    )}
                </TableBody>
              </Table>
            </Card>
          </MuiThemeProvider>
        </div>
      </div >
    );
  }
}
MyDocuments.propTypes = {
  count: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

function mapStateToProps(state) {
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
export default connect(mapStateToProps, mapDispatchToProps)(MyDocuments);
