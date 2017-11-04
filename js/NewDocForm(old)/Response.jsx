import React from 'react';
import ResponsePart from './ResponsePart.jsx';
import AutosizeInput from 'react-input-autosize';

class Response extends React.Component {
  render() {
    return (
      <div className='new-form-responses'>
        {
          this.props.problem.response.map( (part, idx) => {
            if (part.blank) {
              return (
                <div key={ part.id } >
                  <input
                    placeholder="Answer blank"
                    className='new-form-answer-input'
                    value={ this.props.problem.response[idx].text }
                    onChange={ this.props.handleResponseInput(this.props.problemIdx, idx) }
                  />
                  <button className='modify-blank remove-blank' onClick={ (event) => this.props.removeBlank(this.props.problemIdx, idx) }>-</button>
                </div>
              );
            } else {
              const placeholder = idx === 0 ? 'Response' : '...continue response';
              const minWidth = idx === 0 ? '' : '10';

              return (
                <ResponsePart
                  key={ part.id }
                  problemIdx={this.props.problemIdx}
                  respIdx={idx}
                  dropBlank={this.props.dropBlank}
                  moveBlank={this.props.moveBlank}
                >
                  <AutosizeInput
                    placeholder={ placeholder }
                    minWidth={ minWidth }
                    inputClassName='new-form-response-input'
                    value={ this.props.problem.response[idx].text }
                    onChange={ this.props.handleResponseInput(this.props.problemIdx, idx) }
                  />
                </ResponsePart>
              );
            }
          })
        }
      </div>
    );
  }
}

export default Response;
