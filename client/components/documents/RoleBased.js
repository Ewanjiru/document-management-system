import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import ReactNotify from 'react-notify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as DocumentActions from '../../actions/DocumentsAction';
import Header from '../common/Header';
import authenticate from '../../api/helper';
import './Document.scss';

class RoleBased extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      },
      error: this.props.error
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenView = this.handleOpenView.bind(this);
    this.onchange = this.onchange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadRoleDocuments(this.state.token).then(() => {
      if (this.props.documents.all.length === 0) {
        this.showNotification('Error: That role has no documents');
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
    this.props.actions.deleteDocument(this.state.id).then(() => {
      this.showNotification(this.props.error.error);
      this.handleClose();
      window.location.reload();
    });
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
      <div>
        <Header />
        <div className="wrapper">
          <ul className="nav nav-pills">
            <li role="presentation"><a href="/edocx/documents">All Documents</a></li>
            <li role="presentation"><a href="/edocx/documents/mydocuments">My Documents</a></li>
            <li role="presentation" className="active"><a href="/edocx/documents/roledocuments">{role} Documents</a></li>
            <li role="presentation"><a href="/edocx/documents/newdocument">New Document</a></li>
          </ul>
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
                      <option value="">choose..</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value={role}>Role Based</option>
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
                  <CardTitle title={`${this.props.documents.byId.title} by ${this.props.documents.byId.userId}`} />
                  <CardText>
                    {this.props.documents.byId.content}
                  </CardText>
                </Card>
              </Dialog>
            </MuiThemeProvider>
          </div>

          <MuiThemeProvider>
            <Card>
              <Table>
                <TableHeader>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow >
                    <TableHeaderColumn>Document title</TableHeaderColumn>
                    <TableHeaderColumn>Document access</TableHeaderColumn>
                  </TableRow>
                  {
                    this.props.documents.all.map(adocument =>
                      (<TableRow key={adocument.id}>
                        <TableRowColumn>{adocument.title}</TableRowColumn>
                        <TableRowColumn>{adocument.access}</TableRowColumn>
                        <TableRowColumn>
                          <RaisedButton
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
              <div>
                <ReactNotify ref="notificator" />
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
RoleBased.propTypes = {
  documents: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string
};

function mapStateToProps(state) {
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
export default connect(mapStateToProps, mapDispatchToProps)(RoleBased);
