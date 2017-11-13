import React, { Component } from 'react';
import ContentEditable from 'react-simple-contenteditable';

export default class Test extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title: "Title here"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (ev, value) {
    this.setState({
      title: value
    });
  }

  render() {
    return (
      <div className="App">
        <ContentEditable
          html={this.state.title}
          className="my-class"
          tagName="h1"
          onChange={ this.handleChange }
          contentEditable="plaintext-only"
        />
      </div>
    );
  }
}
