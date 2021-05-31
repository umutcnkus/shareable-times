import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stopwatch from './components/stopwatch/Stopwatch';

function App() {
  const startTime = new Date(2021, 4, 28, 20, 30, 0);
  const now = new Date();
  const difference =  now.getTime() - startTime.getTime();
  const offsetTimestamp = new Date();
  offsetTimestamp.setSeconds(offsetTimestamp.getSeconds() + difference/1000);
  return (
    <div className="App">
      <Stopwatch offsetTimestamp={offsetTimestamp}></Stopwatch>
    </div>
  );
}

export default App;
