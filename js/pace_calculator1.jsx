import React from 'react';
import PaceForm from './pace_form1';

class PaceCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.calculatePace = this.calculatePace.bind(this);
  }

  timeToFloat(min, sec) {
    let decimal = Number(sec) / 60;
    return Number(min) + decimal;
  }

  floatToTimeStr(float) {
    let min = parseInt(float);
    let sec = Math.round((float - min) * 60);
    if (sec < 10) {
      sec = '0' + sec;
    }
    return `${min}:${sec}`;
  }

  calculatePace(min, sec, distance, mileInterval) {
    let goalTime = this.timeToFloat(min, sec);
    let distanceInterval = Number(distance) / Number(mileInterval);
    let paceTime = this.floatToTimeStr(goalTime / distanceInterval);
    return paceTime;
  }

  render() {
    return (
      <PaceForm calculatePace={this.calculatePace}/>
    );
  }
}

export default PaceCalculator;
