// App.js
import React from 'react';
import './App.css';
import LoginForm from '../src/component/Form';
import Fetch from './component/Fetch';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* Remove the default content */}
        <LoginForm /> {/* Render the LoginForm component */}
        <Fetch />
      {/* </header> */}
    </div>
  );
}

export default App;
