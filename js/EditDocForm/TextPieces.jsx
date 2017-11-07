import React from 'react';
import TextPiece from './TextPiece.jsx';
import AutosizeInput from 'react-input-autosize';
import ReactDOM from 'react-dom';
import ContentEditable from 'react-simple-contenteditable';
import ReactDOMServer from 'react-dom/server';
import ButtonRow from '../ui/ButtonRow.jsx';

class TextPieces extends React.Component {
  render() {
    const test = ReactDOMServer.renderToStaticMarkup(this.textPieces());
    // debugger;
    return (
      <ContentEditable
        html={ReactDOMServer.renderToStaticMarkup(this.textPieces())}
        className="my-class"
        tagName="div"
        onChange={ (event, value) => this.props.handleTextPiecesInput(this.props.problemIdx, 3, value) }
        contentEditable='plaintext-only'
      />
    );

  }

  textPieces() {
    return (
      <div className='new-form-text-pieces'>
        {
          this.props.problem.textPieces.map( (textPiece, idx) => {
            if (textPiece.blank) {
              return (
                <div key={ textPiece.id } >
                  <div className='blank'>
                    <input
                      placeholder="Answer blank"
                      className='new-form-answer-input'
                      value={ this.props.problem.textPieces[idx].text }
                      onChange={ (event) => this.props.handleTextPiecesInput(this.props.problemIdx, idx, event.target.value) }
                    />
                    <button className='modify-blank remove-blank' onClick={ (event) => this.props.removeBlank(this.props.problemIdx, idx) }>-</button>

                  </div>
                </div>
              );
            } else {
              return (
               this.props.problem.textPieces[idx].text 
              );
            }
          })
        }
      </div>
    );
  }

  textPieces1() {
    return (
      <div className='new-form-text-pieces'>
        {
          this.props.problem.textPieces.map( (textPiece, idx) => {
            if (textPiece.blank) {
              return (
                <div key={ textPiece.id } >
                  <div className='blank'>
                    <input
                      placeholder="Answer blank"
                      className='new-form-answer-input'
                      value={ this.props.problem.textPieces[idx].text }
                      onChange={ (event) => this.props.handleTextPiecesInput(this.props.problemIdx, idx, event.target.value) }
                    />
                    <button className='modify-blank remove-blank' onClick={ (event) => this.props.removeBlank(this.props.problemIdx, idx) }>-</button>

                  </div>
                </div>
              );
            } else {
              const placeholder = idx === 0 ? 'Problem text' : '...continue text';
              const minWidth = idx === 0 ? '' : '10';

              return (

                  <div key={ textPiece.id }>{ this.props.problem.textPieces[idx].text }</div>
              );
            }
          })
        }
      </div>
    );
  }
}

export default TextPieces;
