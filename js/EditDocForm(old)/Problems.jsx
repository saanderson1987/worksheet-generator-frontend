import React from 'react';
import Problem from './Problem.jsx';
import TextPieces from './TextPieces.jsx';


class Problems extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.problems.map( (problem, idx) => {
            return(
              <Problem
                key={ problem.id }
                id={problem.id}
                index={idx}
                {...this.props}
                question={problem.question}
                opaque={problem.opaque}
              >
                <div>
                  { idx + 1 }.{' '}
                    <TextPieces
                      problem={this.props.problems[idx]}
                      problemIdx ={idx}
                      {...this.props}
                    />
                </div>
              </Problem>
            );
          })
        }
      </div>
    );
  }
}

export default Problems;

//Problem props:
// moveProblem={this.props.moveProblem}
// addNewProblem={this.props.addNewProblem}
// makeProbVisible={this.props.makeProbVisible}
// removeBlank={this.props.removeBlank}

//TextPieces props:
// handleTextPiecesInput={this.props.handleTextPiecesInput}
// removeBlank={this.props.removeBlank}
// dropBlank={this.props.dropBlank}
// moveBlank={this.props.moveBlank}
