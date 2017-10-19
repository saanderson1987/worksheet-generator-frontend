import React from 'react';
import ReactDOM from 'react-dom';
import NewDocForm from './NewDocForm.jsx';
import DocForm from './DocForm/DocForm.jsx';
import {cloneDeep} from 'lodash';
import shortid from 'shortid';

const probs = [
  {
    question : "Comment tu t'appelles?",
    id: shortid.generate(),
    response : [
      {
        text : "Je m'appelle",
        blank : true,
        id: shortid.generate(),
      },
      {
        text : "Michel.",
        blank : false,
        id: shortid.generate(),
      }
    ]
  }
];

const genBlanks = (problems) => {
  let probsWithBlanks = cloneDeep(problems);
  problems.forEach( (problem, problemIdx) => {
    problem.response.forEach( (part, idx) => {
      if (part.blank) {
        probsWithBlanks[problemIdx].response[idx].text = '';
      }
    });
  });
  return probsWithBlanks;
};

const probsWithBlanks = genBlanks(probs);

const App = () => {
  return (
    <div>
      <NewDocForm />
      <DocForm problems={probsWithBlanks}/>
    </div>
  );

};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
