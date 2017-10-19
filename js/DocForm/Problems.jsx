import React from 'react';
import Response from './Response.jsx';

class Problems extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.problems.map( (problem, idx) => {
            return(
              <div key={problem.id}>
                <div>{idx+1}. { problem.question }</div>
                <Response
                  problem={this.props.problems[idx]}
                  problemIdx ={idx}
                  {...this.props}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Problems;
