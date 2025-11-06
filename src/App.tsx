import React from 'react';
import './App.css';
import Selection from './components/selection/Selection';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Stopwatch from './components/stopwatch/Stopwatch';
import Timer from './components/timer/Timer';

function App() {
  return (
    <div className="App">
      <Router basename="/shareable-times">
        <Routes>
          <Route path="/stopwatch/:start" element={<Stopwatch />} />
          <Route path="/timer/:end" element={<Timer />} />
          <Route path="/" element={<Selection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
