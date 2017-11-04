import React from 'react';
import NewBlank from './NewBlank';
import NewProblem from './NewProblem';
import shortid from 'shortid';

class Toolbox extends React.Component {
  render() {
    return (
      <div className='toolbox'>
        <div>Toolbox</div>
        <NewBlank id={shortid.generate()} />
        <NewProblem id={shortid.generate()} removeProblem={this.props.removeProblem} makeProbVisible={this.props.makeProbVisible} />
      </div>
    );
  }
}

export default Toolbox;
