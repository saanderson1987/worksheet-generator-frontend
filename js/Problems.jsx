import React from 'react';
import Problem from './Problem.jsx';
import Response from './Response.jsx';


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
                moveProblem={this.props.moveProblem}
                addNewProblem={this.props.addNewProblem}
                makeProbVisible={this.props.makeProbVisible}
                removeBlank={this.props.removeBlank}
                question={problem.question}
                opaque={problem.opaque}
              >
                <div>
                  { idx + 1 }.{' '}
                  <input
                    placeholder='Question'
                    value={this.props.problems[idx].question}
                    onChange={this.props.handleQuestionInput(idx)}
                  />
                  <div>
                    <Response
                      problem={this.props.problems[idx]}
                      problemIdx ={idx}
                      handleResponseInput={this.props.handleResponseInput}
                      removeBlank={this.props.removeBlank}
                      dropBlank={this.props.dropBlank}
                      moveBlank={this.props.moveBlank}
                    />
                  </div>
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
