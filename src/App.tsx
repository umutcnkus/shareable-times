import React from 'react';
import './App.css';
import Selection from './components/selection/Selection';

function App() {
  const startTime = new Date(2021, 4, 28, 20, 30, 0);
  const now = new Date();
  const difference =  now.getTime() - startTime.getTime();
  const offsetTimestamp = new Date();
  offsetTimestamp.setSeconds(offsetTimestamp.getSeconds() + difference/1000);
  return (
    <div className="App">
      <Selection></Selection>
    </div>
  );
}

export default App;
