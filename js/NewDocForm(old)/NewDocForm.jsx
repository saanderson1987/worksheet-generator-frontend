import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';
import AutosizeInput from 'react-input-autosize';
import {cloneDeep} from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import shortid from 'shortid';

import Problems from './Problems.jsx';
import Problem from './Problem.jsx';
import Response from './Response.jsx';
import Toolbox from './Toolbox.jsx';

class NewDocForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateDoc = this.updateDoc.bind(this);
    this.handleDocNameInput = this.handleDocNameInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleResponseInput = this.handleResponseInput.bind(this);
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
      problems: [
        {
          question: 'a',
          id: shortid.generate(),
          response: [
            {
              text: '',
              blank: false,
              id: shortid.generate()
            }
          ],
        },
        {
          question: 'b',
          id: shortid.generate(),
          response: [
            {
              text: '',
              blank: false,
              id: shortid.generate(),

            }
          ],
        },
        {
          question: 'c',
          id: shortid.generate(),
          response: [
            {
              text: '',
              blank: false,
              id: shortid.generate(),
            }
          ],
        },
      ],
      submitStatus: '',
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
                onChange={ this.handleDocNameInput()}
              />
            </h3>
            <Problems
              problems={this.state.problems}
              moveProblem={this.moveProblem}
              addNewProblem={this.addNewProblem}
              makeProbVisible={this.makeProbVisible}
              removeBlank={this.removeBlank}
              handleQuestionInput={this.handleQuestionInput}
              handleResponseInput={this.handleResponseInput}
              dropBlank={this.dropBlank}
              moveBlank={this.moveBlank}
            />
            <button onClick={this.updateDoc}>Save Changes</button>
            { JSON.stringify(this.state) }
          </div>
          <Toolbox
            removeProblem={this.removeProblem}
            makeProbVisible={this.makeProbVisible}
          />
        </div>
      </div>
    );
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
      id: shortid.generate(),
    });
    const nextResp = problems[problemIdx].response[respIdx + 1];
    if (!nextResp) {
      problems[problemIdx].response.splice(respIdx + 1, 0, {
        text: '',
        blank: false,
        id: shortid.generate(),
      });
    }
    this.setState({ problems });
  }

  moveBlank(dragIndex, hoverIndex, problemIdx) {
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
        blank: false,
        id: shortid.generate(),
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
        if (response[respIdx].text) {
          response[respIdx - 1].text += ' ' + response.splice(respIdx, 1)[0].text;
        } else {
          response.splice(respIdx, 1);
        }
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

  addNewProblem(idx) {
    const problem = {
      question: '',
      id: shortid.generate(),
      response: [
        {
          text: '',
          blank: false,
          id: shortid.generate(),
        }
      ],
      opaque: true
    };
    const problems = cloneDeep(this.state.problems);
    problems.splice(idx, 0, problem);
    this.setState( prevState => {
      return {problems};
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

  handleDocNameInput() {
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

  updateDoc(event) {
    event.preventDefault();
    // const { docName, problems } = this.state;
    // // make sure to grab the uneditable fields of the document so that
    // // they are not erased with the update method. Update method replaces
    // // the document if not mongo update modifiers are specified. It does
    // // not replace the field _id.
    // // They will probably be this.props.<whatever>
    // Meteor.call('documents.upsert', { docName, problems },
    //   (err, res) => {
    //     const submitStatus = err ? 'Error, check console log' : 'SUCCESS!';
    //     console.log(err);
    //     this.setState({ submitStatus });
    // });
  }

}

export default DragDropContext(HTML5Backend)(NewDocForm);
