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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as DocumentActions from '../../actions/DocumentsAction';
import Header from '../common/Header';
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
      }
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenView = this.handleOpenView.bind(this);
    this.onchange = this.onchange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadRoleDocuments(this.state.token);
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
    this.props.actions.editDocument(this.state.id, this.state.edit);
    this.setState({ openView: false, openEdit: false, edit: { title: '', content: '', access: '' } });
  }

  handleClose() {
    this.setState({ openView: false, openEdit: false });
  }

  handleOpenView(id) {
    this.setState({ id, openView: true });
    this.props.actions.viewDocument(id);
  }

  handleDelete(id) {
    this.props.actions.deleteDocument(this.state.id);
  }

  render() {
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
        <Header />
        <ul className="nav nav-pills">
          <li role="presentation"><a href="/edocx/documents">All Documents</a></li>
          <li role="presentation"><a href="/edocx/documents/mydocuments">My Documents</a></li>
          <li role="presentation" className="active"><a href="/edocx/documents/roledocuments">RoleBased Documents</a></li>
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
                <TableRow >
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Access Type</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
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
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}
RoleBased.propTypes = {
  documents: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleBased);
