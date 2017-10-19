import React from 'react';
import Problems from './Problems.jsx';

class DocForm extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Problems />
        { this.props.formState === 'edit' ? <Toolbox /> : null } // or put this after this.props.children in the 'edit' HOC
      </div>
    );
  }

}

export default DocForm;



render() {
  return (
    <Header></Header>
    <Problems>
      <Problem>
        <Question></Question>
        <Response>
          <ResponsePart></ResponsePart>
        </Response>
      </Problem>
    </Problems>
    { this.props.formState === 'edit' ? <Toolbox /> } // or put this after this.props.children in the 'edit' HOC
  );
}
