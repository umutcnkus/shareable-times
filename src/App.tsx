import React from 'react';
import './App.css';
import Selection from './components/selection/Selection';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Stopwatch from './components/stopwatch/Stopwatch';
import Timer from './components/timer/Timer';

function App() {
  const startTime = new Date(2021, 4, 28, 20, 30, 0);
  const now = new Date();
  const difference =  now.getTime() - startTime.getTime();
  const offsetTimestamp = new Date();
  offsetTimestamp.setSeconds(offsetTimestamp.getSeconds() + difference/1000);
  return (
    <div className="App">
      <Router baseName="/sharable-times">
        <Switch>
        <Route path="/shareable-times/stopwatch/:start">
          <Stopwatch></Stopwatch>
        </Route>
        <Route path="/shareable-times/timer/:end">
          <Timer></Timer>
        </Route>
        <Route path="/">
          <Selection></Selection>
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
