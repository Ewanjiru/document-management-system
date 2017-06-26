import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import * as DocumentActions from '../../actions/DocumentsAction';
import './Document.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      searchText: '',
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
  }

  handleUpdateInput(searchText) {
    this.setState({
      searchText,
    });
  }

  handleNewRequest() {
    //const loadedDocuments= this.props.actions.loadDocuments();
    this.setState({
      searchText: '',
      //documents: loadedDocuments
    });
  }

  render() {
    console.log(this.state, this.props);
    return (
      <div id="card">
      me
        {/* <Card>
         <AutoComplete
            name="search by title"
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            dataSource={this.props.documents}
            filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
            openOnFocus
          />
        </Card>*/}
      </div>
    );
  }
}

Search.propTypes = {
  documents: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log(state.documents);
  return {
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
