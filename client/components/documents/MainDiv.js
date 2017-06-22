import React from 'react';
import PropTypes from 'react-proptypes';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Document.scss';

const Content = props => (
  <div className="wrapper">
    <Card>
      <CardTitle id="card">
        <TextField
          hintText="TITLE"
          name="title"
          value={props.documents.title}
          onChange={props.onchange}
          fullWidth
        />
      </CardTitle>
      <CardHeader>
      Access Type:
          <select value={props.documents.access} name="access" onChange={props.onchange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
      </CardHeader>
      <CardText>
        <textarea
          id="textarea"
          rows="22"
          cols="120"
          name="content"
          value={props.documents.content}
          onChange={props.onchange}
        >Enter content here...</textarea>
      </CardText>
      <CardActions>
        <RaisedButton label="Create" secondary onClick={props.create} />
        <RaisedButton label="Discard" secondary />
      </CardActions>
    </Card>
  </div>
);
Content.propTypes = {
  documents: PropTypes.object.isRequired,
  onchange: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  //logCancel: PropTypes.func.isRequired
};

export default Content;
