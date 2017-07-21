import React from 'react';
import PaceForm from './pace_form';
import PaceOutput from './pace_output';

class PaceCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      goalMin: '',
      goalSec: '',
      mileInterval: '0.25',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onIntervalChange = this.onIntervalChange.bind(this);
    this.processInput = this.processInput.bind(this);
  }

  onInputChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  onIntervalChange(interval) {
    this.setState({mileInterval: interval});
  }

  processInput() {

  }

  render() {
    return (
      <div>
        <PaceForm
          {...this.state}
          onInputChange={this.onInputChange}
          onIntervalChange={this.onIntervalChange}
          processInput={this.processInput}/>
        <PaceOutput {...this.state} />
      </div>

    );
  }
}

export default PaceCalculator;
