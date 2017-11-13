import React from 'react';
import TextPiece from './TextPiece.jsx';
import AutosizeInput from 'react-input-autosize';
import ReactDOM from 'react-dom';
import ContentEditable from 'react-simple-contenteditable';
import ReactDOMServer from 'react-dom/server';
import ButtonRow from '../ui/ButtonRow.jsx';

class TextPieces extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textPieces: 'hi'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (ev, value) {
    this.setState({
      textPieces: value
    });
  }


  render() {
    const textPieces =
      <div className='new-form-text-pieces'>
        {
          this.props.problem.textPieces.map( (textPiece, idx) => {
            if (textPiece.blank) {
              return (
                  <div data-blank={true} className='blank' key={ textPiece.id } style={{display: 'inline'}}>
                    <input
                      placeholder="Answer blank"
                      className='new-form-answer-input'
                      value={ this.props.problem.textPieces[idx].text }
                      onChange={ (event) => this.props.handleTextPiecesInput(this.props.problemIdx, idx, event.target.value) }
                    />
                    <button className='modify-blank remove-blank' onClick={ (event) => this.props.removeBlank(this.props.problemIdx, idx) }>-</button>

                  </div>
              );
            } else {
              let text = this.props.problem.textPieces[idx].text;
              const placeholder = idx === 0 ? 'Problem text' : '...continue text';
              // text = text === '' ? placeholder : text;
              if (text === '') {
                text = <span style={{color:'gray'}}>{placeholder}</span>;
              } else {

              }
              return (
                this.props.isTextSplit ?
                  <TextPiece
                    key={ textPiece.id }
                    problemIdx={this.props.problemIdx}
                    textPieceIdx={idx}
                    dropBlank={this.props.dropBlank}
                    moveBlank={this.props.moveBlank}
                  >
                    <div style={{display: 'inline-block', }}>{text}</div>
                  </TextPiece>
                : text

              );
            }
          })
        }
      </div>;
      // html={this.state.textPieces}


    return (
      // this.props.isTextSplit ? textPieces :
        <ContentEditable
          html={ReactDOMServer.renderToStaticMarkup(textPieces)}
          className="my-class"
          tagName="div"
          onChange={ (event, value) => this.props.handleProblemChange(event, this.props.problemIdx, value) }
          // onChange={ this.handleChange }
          contentEditable='plaintext-only'
        />
    );

  }


}

export default TextPieces;
