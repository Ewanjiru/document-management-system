import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import './Documents';

class SideBar extends React.Component {
  render() {
    return (
      <div>
        <Drawer width={300} openSecondary >
          <AppBar title="Published Documents" />
          <List>
            {
            this.props.doc.map(documentt => (
              <ListItem
                key={documentt.id}
                primaryText={documentt.title + ' By ' + documentt.userId}
              />
               ))
            }
          </List>
        </Drawer>
      </div>
    );
  }
}
SideBar.propTypes = {
  doc: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  let doc = [{ title: '', content: '', createdAt: '', userId: '' }];

  if (state.documents.length > 0) {
    doc = Object.assign([], state.documents);
  }
  return {
    doc
  };
}
export default connect(mapStateToProps)(SideBar);
