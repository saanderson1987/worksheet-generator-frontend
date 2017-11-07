import React from 'react';
import ReactDOM from 'react-dom';
import EditDocForm from './EditDocForm(11-5am)/EditDocForm.jsx';
import DocForm from './DocForm/DocForm.jsx';
import {cloneDeep} from 'lodash';
import shortid from 'shortid';
import NavBar from './NavBar/NavBar.jsx';

const ws1 = {
  docName: 'WS1',
  course: 'ESL 301',
  docType: 'fill-in-the-blank',
  instructions: 'Fill in the blanks with the words in the bank.',
  probs: [
    {
      id: shortid.generate(),
      textPieces: [
        {
          text : "Three days was simply not a(n)",
          blank : false,
          id: shortid.generate(),
        },
        {
          text : "acceptable",
          blank : true,
          id: shortid.generate(),
        },
        {
          text : "amount of time to complete such a lot of work.",
          blank : false,
          id: shortid.generate(),
        },
      ]
    },
    {
      id: shortid.generate(),
      textPieces: [
        {
          text : "You don't need to be a(n)",
          blank : false,
          id: shortid.generate(),
        },
        {
          text : "genius",
          blank : true,
          id: shortid.generate(),
        },
        {
          text : "to see what the problem here is.",
          blank : false,
          id: shortid.generate(),
        },
      ]
    },
    {
      id: shortid.generate(),
      textPieces: [
        {
          text : "Make sure you read all the",
          blank : false,
          id: shortid.generate(),
        },
        {
          text : "instructions",
          blank : true,
          id: shortid.generate(),
        },
        {
          text : "carefully before setting up the device",
          blank : false,
          id: shortid.generate(),
        },
      ]
    },
  ]
};

const wordBank = [];

const genBlanks = (problems) => {
  let probsWithBlanks = cloneDeep(problems);
  problems.forEach( (problem, problemIdx) => {
    problem.textPieces.forEach( (textPiece, idx) => {
      if (textPiece.blank) {
        wordBank.push(textPiece.text);
        probsWithBlanks[problemIdx].textPieces[idx].text = '';
      }
    });
  });
  return probsWithBlanks;
};

const probsWithBlanks = genBlanks(ws1.probs);
import shuffle from './Methods/shuffle.js';
shuffle(wordBank);
const docForm =
  <DocForm
    problems={probsWithBlanks}
    docName={ws1.docName}
    course={ws1.course}
    instructions={ws1.instructions}
    wordBank={wordBank}
  />;


const App = () => {
  return (
    <div>
      <NavBar />
      <div className='page-container'>
        <EditDocForm />
      </div>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
