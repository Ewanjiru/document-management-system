import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
// import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import * as DocumentActions from '../../actions/DocumentsAction';
import './Document.scss';

class View extends React.Component {
  constructor(props) {
    console.log('Winnie', props);
    super(props);
    this.state = {
      id: '',
      openView: false,
      openEdit: false,
      searchText: '',
      documents: props.documents,
      documentById: [],
      edit: {
        title: props.documents.byId.title,
        content: props.documents.byId.content,
        access: props.documents.byId.access,
      }
    };
    console.log(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenView = this.handleOpenView.bind(this);
    this.onchange = this.onchange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadDocuments();
  }

  onchange(event) {
    console.log(event);
    const label = event.target.name;
    console.log(label);
    this.state.edit[label] = event.target.value;
    return this.setState({
      documents: this.state.edit,
    });
  }

  handleOpen(id) {
    this.setState({ id, openEdit: true });
    this.props.actions.viewDocument(id);
  }

  handleEdit(event) {
    event.preventDefault();
    console.log("We are passing", this.state.documentById);
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
    console.log('We are props', this.props);
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
            <Card>
              <CardTitle id="card">
                <TextField
                  name="title"
                  id="edit"
                  value={this.state.edit.title || this.props.documents.byId.title}
                  onChange={this.onchange}
                  fullWidth
                />
              </CardTitle>
              <CardHeader>
                Access Type:
            <select name="access" id="acces" value={this.state.edit.access || this.props.documents.byId.access} onChange={this.onchange}>
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
                  value={this.state.edit.content || this.props.documents.byId.content}
                  onChange={this.onchange}
                />
              </CardText>
            </Card>
          </Dialog>
        </div>

        <div>
          <Dialog
            title="View Document"
            actions={actions2}
            modal={false}
            open={this.state.openView}
            onRequestClose={this.handleClose}
            autoScrollBodyContent
          >
            <Card>
              <CardTitle id="card">
                <TextField
                  id="view"
                  value={this.props.documents.byId.title}
                  disabled
                  fullWidth
                />
              </CardTitle>
              <CardHeader>
                Access Type:
            <select name="access" disabled id="accestype" value={this.props.documents.byId.access}>
                  <option value="" />
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </CardHeader>
              <CardText>
                <textarea
                  value={this.props.documents.byId.content}
                  id="textarea"
                  rows="22"
                  cols="120"
                  disabled
                />
              </CardText>
            </Card>
          </Dialog>
        </div>
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
      </div>
    );
  }
}
View.propTypes = {
  documents: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log('charge your mac', state);
  return {
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(View);
