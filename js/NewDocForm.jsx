import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';
import AutosizeInput from 'react-input-autosize';
import {cloneDeep} from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import shortid from 'shortid';

import Problem from './Problem.jsx';
import NewBlank from './NewBlank.jsx';
import NewProblem from './NewProblem.jsx';
import Box from './Box.jsx';
import Response from './Response.jsx';

class NewDocForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleResponseInput = this.handleResponseInput.bind(this);
    this.addProblem = this.addProblem.bind(this);
    this.moveProblem = this.moveProblem.bind(this);
    this.addNewProblem = this.addNewProblem.bind(this);
    this.makeProbVisible = this.makeProbVisible.bind(this);
    this.dropBlank = this.dropBlank.bind(this);
    this.moveBlank = this.moveBlank.bind(this);
    this.removeBlank = this.removeBlank.bind(this);
    this.removeProblem = this.removeProblem.bind(this);
    this.makeProbVisible = this.makeProbVisible.bind(this);
    this.state = {
      docName: '',
      problemCount: 3,
      problems: [
        {
          question: 'a',
          id: '1',
          response: [
            {
              text: '',
              blank: false
            }
          ],
        },
        {
          question: 'b',
          id: '2',
          response: [
            {
              text: '',
              blank: false
            }
          ],
        },
        {
          question: 'c',
          id: '3',
          response: [
            {
              text: '',
              blank: false
            }
          ],
        },
      ],
      submitStatus: '',
      boxes: [],
    };
  }


  render() {
    return (
      <div>
        <h3>New Document Form</h3>
        <div className='new-doc-container'>
          <div className='new-doc-form'>
            <h3>
              <input
                className='new-doc-name'
                placeholder='Document name   '
                name='docName'
                value={ this.state.docName }
                onChange={ this.handleInput()}
              />
            </h3>
            <form >
              { this.renderProblems() }
              <button onClick={ this.addProblem }>Add Problem</button>
              { JSON.stringify(this.state) }
            </form>
          </div>
          <div className='toolbox'>
            <div>Toolbox</div>
            <NewBlank id={shortid.generate()} drop={this.drop}/>
            <NewProblem id={shortid.generate()} removeProblem={this.removeProblem} makeProbVisible={this.makeProbVisible} />
          </div>
        </div>
      </div>
    );
  }

  renderProblems() {
    return this.state.problems.map( (problem, idx) => {
      return(
        <Problem
          key={ shortid.generate() }
          id={problem.id}
          index={idx}
          moveProblem={this.moveProblem}
          addNewProblem={this.addNewProblem}
          makeProbVisible={this.makeProbVisible}
          question={problem.question}
          opaque={problem.opaque}
          removeBlank={this.removeBlank}
        >
          <div>
            { idx + 1 }.{' '}
            <input
              placeholder='Question'
              value={ this.state.problems[idx].question }
              onChange={ this.handleQuestionInput(idx) }
            />
            <div>
              <div className='new-form-responses'>
                {this.renderResponse(idx)}
              </div>
            </div>
          </div>
        </Problem>
      );
    });
  }

  renderResponse(problemIdx) {
    let problem = this.state.problems[problemIdx];
    return problem.response.map( (part, idx) => {
      if (part.blank) {
        // const opacity = part.opaque ? 0 : 1;
        return (
          <div key={ shortid.generate() } >
            <input
              placeholder="Answer blank"
              className='new-form-answer-input'
              value={ problem.response[idx].text }
              onChange={ this.handleResponseInput(problemIdx, idx) }
            />
            <button className='modify-blank remove-blank' onClick={ (event) => this.removeBlank(problemIdx, idx) }>-</button>
          </div>

        );
      } else {
        const placeholder = idx === 0 ? 'Response' : '...continue response';
        const minWidth = idx === 0 ? '' : '10';

        return (
            <Response
              key={ shortid.generate() }
              problemIdx={problemIdx}
              respIdx={idx}
              dropBlank={this.dropBlank}
              moveBlank={this.moveBlank}
              >
                <AutosizeInput
                  placeholder={ placeholder }
                  minWidth={ minWidth }
                  inputClassName='new-form-response-input'
                  value={ problem.response[idx].text }
                  onChange={ this.handleResponseInput(problemIdx, idx) }
                />
              </Response>
        );
      }
    });
  }

  dropBlank(problemIdx, respIdx) {
    // Don't allow blank to be dropped on a spot right after another blank
    const prevResp = this.state.problems[problemIdx].response[respIdx - 1];
    if (prevResp && prevResp.blank) {
      return;
    }
    const problems = cloneDeep(this.state.problems);
    problems[problemIdx].response.splice(respIdx, 0, {
      text: '',
      blank: true,
    });
    const nextResp = problems[problemIdx].response[respIdx + 1];
    if (!nextResp) {
      problems[problemIdx].response.splice(respIdx + 1, 0, {
        text: '',
        blank: false,
      });
    }
    this.setState({ problems });
  }

  moveProblem(dragIndex, hoverIndex) {
    // const problems = cloneDeep(this.state.problems);
    // const dragProblem = problems.splice(dragIndex, 1)[0];
    // problems.splice(hoverIndex, 0, dragProblem);
    // this.setState({ problems });

    const { problems } = this.state;
    const dragProblem = problems[dragIndex];
    dragProblem.opaque = true;
    this.setState(update(this.state, {
      problems: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragProblem],
        ],
      },
    }));
  }

  moveBlank(dragIndex, hoverIndex, problemIdx, dragItem) {
    // If user tries to move last blank to space after last response text,
    // don't move
    if (hoverIndex - dragIndex === 1) {
      return dragIndex;
    }
    // Don't allow blank to be moved to a spot right after another blank
    const prevResp = this.state.problems[problemIdx].response[hoverIndex - 1];
    if (prevResp && prevResp.blank) {
      return;
    }
    if (dragIndex !== 0 && hoverIndex - dragIndex === 2 && hoverIndex === this.state.problems[problemIdx].response.length) {
      return dragIndex;
    }
    const problems = cloneDeep(this.state.problems);
    const response = problems[problemIdx].response;
    const dragBlank = response.splice(dragIndex, 1)[0];
    response.splice(hoverIndex, 0, dragBlank);
    if (dragIndex > 0) {
      // Combine the response text that followed the blank with the text
      // that came before the blank. Inner if condition checks if there
      // were text, because there weren't, it messes up placeholder text.
      if (response[dragIndex + 1].text) {
        response[dragIndex].text += ' ' + response.splice(dragIndex + 1, 1)[0].text;
      } else {
        response.splice(dragIndex + 1, 1);
      }
    }
    if (dragIndex === 0 && !response[hoverIndex + 1]) {
      response.push ({
        text: '',
        blank: false
      });
    }
    this.setState({ problems });
    let newIndex = problems[problemIdx].response.indexOf(dragBlank);
    console.log (newIndex);
    return newIndex;
  }

  removeBlank(problemIdx, respIdx) {
      event.preventDefault();
      const problems = cloneDeep(this.state.problems);
      const response = problems[problemIdx].response;
      response.splice(respIdx, 1);
      if (respIdx > 0) {
        // Combine the response text that followed the blank with the text
        // that came before the blank. Inner if condition checks if there
        // were text, because there weren't, it messes up placeholder text.
        if (respIdx.text) {
          response[respIdx - 1].text += ' ' + response.splice(respIdx, 1)[0].text;
        } else {
          response.splice(respIdx, 1);
        }
      }
      this.setState({ problems });
  }

  addNewProblem(idx) {
    const problem = {
      question: '',
      id: this.state.problemCount + 1,
      response: [
        {
          text: '',
          blank: false
        }

      ],
      opaque: true
    };
    const problems = cloneDeep(this.state.problems);
    problems.splice(idx, 0, problem);
    this.setState( prevState => {
      return {
        problemCount: prevState.problemCount ++,
        problems
      };
    });
  }

  addProblem(event) {
    event.preventDefault();
    const problem = {
      question: '',
      id: this.state.problemCount + 1,
      response: [
        {
          text: '',
          blank: false
        }
      ],
    };
    const problems = cloneDeep(this.state.problems);
    problems.push(problem);
    this.setState( prevState => {
      return {
        problemCount: prevState.problemCount ++,
        problems
      };
    });
  }

  removeProblem(idx) {
    const problems = cloneDeep(this.state.problems);
    problems.splice(idx, 1);
    this.setState({ problems });
  }

  makeProbVisible(idx) {
    const problems = cloneDeep(this.state.problems);
    problems[idx].opaque = false;
    this.setState({ problems });
  }

  handleInput() {
    return (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({ [name]: value });
    };
  }

  handleQuestionInput(problemIdx) {
    return (event) => {
        const value = event.target.value;
        const problems = cloneDeep(this.state.problems);
        problems[problemIdx].question = value;
        this.setState( { problems });
      };
  }

  handleResponseInput(problemIdx, respIdx) {
    return (event) => {
      const value = event.target.value;
      const problems = cloneDeep(this.state.problems);
      problems[problemIdx].response[respIdx].text = value;
      this.setState({ problems });
    };
  }

}

export default DragDropContext(HTML5Backend)(NewDocForm);
