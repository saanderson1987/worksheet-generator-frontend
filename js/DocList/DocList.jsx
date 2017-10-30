import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Exercises } from '../api/exercises.js';
import { Documents, UserDocuments } from '../api/documents.js';
import { Link } from 'react-router-dom';
import EditDoc from './EditDoc.jsx';



class DocList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const documents = this.props.documents ? this.props.documents.map( (doc) => {
      return (
        <li key={ doc._id }>
          <Link to={`documents/${doc._id}`}>{ doc.docName }</Link>
          { this.props.docType === 'owner' ?
            <Link to={`documents/${doc._id}/edit`}>    Edit</Link>
            : ''
          }
        </li>
      );
    }) : '';

    const header = this.props.docType === 'owner' ?
      "Documents I've Created" : "Documents I'm Subscribed To";

    return (
      <div>
        <h3></h3>
        <ul>
          {documents}
        </ul>
        Props: {JSON.stringify(this.props)}
      </div>
    );
  }

}

export default createContainer((props) => {
  Meteor.subscribe('documents');
  const searchCriteria = props.docType === 'owner' ? {owner: Meteor.userId()} :
    {permittedUsers: { $in: [Meteor.userId()]}};
  return ({
    documents: Documents.find({searchCriteria}).fetch(),
  });
}, DocList);
