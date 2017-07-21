import React from 'react';

class PaceOutput extends React.Component {

  constructor(props) {
    super(props);
  }

  timeToFloat(min, sec) {
    let decimal = sec / 60;
    return min + decimal;
  }

  floatToTimeStr(float) {
    let min = parseInt(float);
    let sec = Math.round((float - min) * 60);
    if (sec < 10) {
      sec = '0' + sec;
    }
    return `${min}:${sec}`;
  }

  findPace(time, interval) {
    return this.floatToTimeStr(time / interval);
  }

  render() {
    const goalTime = this.timeToFloat(this.props.min, this.props.sec);
    const distanceInterval = this.props.distance / this.mileInterval;
    const pace = this.findPace(goalTime, distanceInterval);

    return (
      <p>
      {this.props.mileInterval}
        Goal Time: {goalTime}
        Pace: {pace}
      </p>
    );
  }


}



export default PaceOutput;
