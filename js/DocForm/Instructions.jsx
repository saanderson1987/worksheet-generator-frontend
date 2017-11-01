import React from 'react';

export default class Instructions extends React.Component {
  render() {
    const mode = this.props.edit ? 'edit' : 'read';
    const values = {
      instructions: {
        read:
          <div>{this.props.instructions}</div>,
        edit:
        <input
          value={this.props.instructions}
          name='instructions'
          onChange={this.props.handleInput()}
        />
      }
    };

    return (
      <div className='section'>
        <div className='header'>
          Instructions:
        </div>
        {values.instructions[mode]}
      </div>
    );
  }
}
