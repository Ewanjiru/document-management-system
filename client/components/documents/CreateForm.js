import React from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DocumentActions from '../../actions/DocumentsAction';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactNotify from 'react-notify';
import Header from '../common/Header';
import TextField from 'material-ui/TextField';
import authenticate from '../../api/helper';
import './Document.scss';

export class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: {
        title: '',
        content: '',
        access: '',
        userId: sessionStorage.Token,
      },
      role: '',
      error: this.props.error
    };
    this.create = this.create.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  componentDidMount() {
    const userDetails = authenticate(sessionStorage.Token);
    const role = userDetails.roleType;
    this.state.role = role;
  }

  onchange(event) {
    const label = event.target.name;
    this.state.documents[label] = event.target.value;
    return this.setState({
      documents: this.state.documents,
    });
  }

  create(event) {
    event.preventDefault();
    this.props.actions.newDocument(this.state.documents).then(() => {
      this.showNotification(this.props.error.error);
    });
    this.setState({
      documents: {
        title: '',
        content: '',
        access: '',
      }
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
    return (
      <div className="wrapper">
        <Header />
        <ul className="nav nav-pills">
          <li role="presentation"><a href="/edocx/documents" name="view">All Documents</a></li>
          <li role="presentation"><a href="/edocx/documents/mydocuments">My Documents</a></li>
          <li role="presentation"><a href="/edocx/documents/roledocuments">RoleBased Documents</a></li>
          <li role="presentation" className="active"><a href="/edocx/documents/newdocument">New Document</a></li>
        </ul>
        <MuiThemeProvider>
          <Card>
            <div>
              <ReactNotify ref="notificator" />
            </div>
            <form>
              <div className="row">
                <label>Document Title</label>
                <CardTitle>
                  <TextField
                    name="title"
                    value={this.state.documents.title}
                    onChange={this.onchange}
                    fullWidth
                  />
                </CardTitle>
              </div>
              <div className="row">
                <label>Access Type:</label>
                <CardTitle>
                  <select id="access" value={this.state.documents.access} name="access" onChange={this.onchange}>
                    <option value="">choose...</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value={this.state.role}>Role Based</option>
                  </select>
                </CardTitle>
              </div>
              <div className="row">
                <label>Content</label>
                <CardTitle>
                  <textarea
                    id="textarea"
                    rows="10"
                    name="content"
                    value={this.state.documents.content}
                    onChange={this.onchange}
                    fullWidth
                  >Enter content here...</textarea>
                </CardTitle>
              </div>
              <div className="row">
                <CardActions>
                  <RaisedButton disabled={!this.state.documents.title || !this.state.documents.content || !this.state.documents.access} id="submit" label="Create" primary={true} onClick={this.create} />
                  <RaisedButton label="Discard" secondary />
                </CardActions>
              </div>
            </form>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

CreateForm.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);

