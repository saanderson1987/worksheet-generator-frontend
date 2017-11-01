import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';
// import { Documents } from '../api/documents.js';
import {cloneDeep} from 'lodash';
// import DocResults from './DocResults.jsx';
import shortid from 'shortid';
import Problems from './Problems.jsx';
import WordBank from './WordBank.jsx';
import Instructions from './Instructions.jsx';

class DocForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      problems: this.props.problems,
      graded: false
    };
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.problems.length > 0) {
      this.setState( {problems: nextProps.problems});
    }
  }

  render() {
    if (this.props.problems.length < 1) {
      return(<div>Loading...
          <br /> this.state:
          {JSON.stringify(this.state)}
          <br />this.props:
          {JSON.stringify(this.props)}</div>);
    }

    return (
      <div>
        <h1>{ this.props.docName }</h1>
        <div>{this.props.course}</div>
        <Instructions instructions={this.props.instructions}/>
        <WordBank wordBank={this.props.wordBank}/>
        <Problems
          problems={this.state.problems}
          handleInputChange={this.handleInputChange}
        />
        <button className='button_green' onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }

  handleInputChange(problemIdx, textPieceIdx) {
    return (event) => {
      const value = event.target.value;
      const problems = cloneDeep(this.state.problems);
      problems[problemIdx].textPieces[textPieceIdx].text = value;
      this.setState({ problems });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({graded: true});
  }

}

const genBlanks = (problems) => {
  let probsWithBlanks = cloneDeep(problems);
  problems.forEach( (problem, problemIdx) => {
    problem.textPieces.forEach( (textPiece, idx) => {
      if (textPiece.blank) {
        probsWithBlanks[problemIdx].textPieces[idx].text = '';
      }
    });
  });
  return probsWithBlanks;
};

export default DocForm;
// export default createContainer( ({match}) => {
//   Meteor.subscribe('documents');
//   const doc = Documents.findOne(match.params._id);
//   const props = {
//     problems: doc ? genBlanks(doc.problems) : [],
//     docName: doc ? doc.docName : ''
//   };
//   return props;
// }, DocForm);
