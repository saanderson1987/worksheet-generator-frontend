import React from 'react';
import ReactDOM from 'react-dom';
import PaceCalculator from './pace_calculator1';

const App = () => {
  return (
    <div>
      <header>
        <h1>Run Pace Calculator</h1>
      </header>
      <PaceCalculator />
    </div>
  );

};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
