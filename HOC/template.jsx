import React from 'react';
import shortid from 'shortid';

import editableDoc from './editable.jsx';
import DocForm from './DocForm.jsx';

class blah extends React.Component {
  constructor(props) {
    super(props);
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
    // set container to higher order component based on form type
    const container = function (formState) {
      switch (formState) {
        case 'edit':
          return editableDoc;
        default:
          return (component) => component;
      }
    }(this.props.formState);

    const WrappedDocForm = container(DocForm);

    return (
      <WrappedDocForm />
    );
  }

}

export default blah;
