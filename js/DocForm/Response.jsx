import React from 'react';

class Response extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.problem.response.map( (part, idx) => {
            if (part.blank) {
              return (
                <input
                  key={ part.id }
                  value={ part.text }
                  onChange={ this.props.handleInputChange(this.props.problemIdx, idx) }
                />
              );
            } else {
              return <div key={ part.id }>{ part.text }</div>;
            }
          })
        }
      </div>
    );
  }
}

export default Response;
