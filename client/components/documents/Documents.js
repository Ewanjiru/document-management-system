import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './ViewDocuments';
import Content from './CreateForm';
import SideBar from './SideBar';
import Header from '../common/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as DocumentActions from '../../actions/DocumentsAction';
import './Documents';


class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: {
        title: '',
        content: '',
        access: '',
        userId: sessionStorage.Token
      },
    };
    this.create = this.create.bind(this);
    this.onchange = this.onchange.bind(this);
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
    this.props.actions.newDocument(this.state.documents);
  }

  render() {
    return (
      <div className="mainframe">
        <Header />
        <MuiThemeProvider>
          <SideBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <View
            documents={this.state.documents}
            onchange={this.onchange}
            create={this.create}
            logCancel={this.logCancel}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Documents.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);

