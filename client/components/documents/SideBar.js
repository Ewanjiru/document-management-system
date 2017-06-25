import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import './Documents';

class SideBar extends React.Component {
  render() {
    return (
      <div className="aside">
        <Drawer openSecondary >
          <AppBar title="Options" showMenuIconButton={false} />
          <List>
            <ListItem
              value="create"
              primaryText={'Create New'}
            />
            <Divider />
            <ListItem
              primaryText={'Public Documents'}
            />
            <Divider />
            <ListItem
              primaryText={'My Documents'}
            />
            <Divider />
            <ListItem
              primaryText={'Search Documents'}
            />
            <Divider />
          </List>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let doc = [{ title: '', content: '', createdAt: '', userId: '' }];

  if (state.documents.length > 0) {
    doc = Object.assign([], state.documents);
  }
  return {
    doc
  };
}
export default connect(mapStateToProps)(SideBar);
