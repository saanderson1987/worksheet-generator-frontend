import React from 'react';
import ReactDOM from 'react-dom';
import NewDocForm from './NewDocForm.jsx';

const App = () => {
  return (
    <div>
      <NewDocForm />
    </div>
  );

};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
