import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Document.scss';

class CreateNew extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Card>
          <CardTitle id="card">
            <TextField hintText="TITLE" fullWidth />
          </CardTitle>
          <CardHeader>Access Type:
            <input type="checkbox" name="access" value="public" />Public
            <input type="checkbox" name="access" value="private" />Private
          </CardHeader>
          <CardText>
            <textarea id="textarea" rows="22" cols="120">Enter content here...</textarea>
          </CardText>
          <CardActions>
            <RaisedButton label="Create" secondary />
            <RaisedButton label="Discard" secondary />
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default CreateNew;
