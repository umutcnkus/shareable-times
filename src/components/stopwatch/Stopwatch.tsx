import React from 'react';
import './Stopwatch.css';
import { useStopwatch } from 'react-timer-hook';

function Stopwatch({ offsetTimestamp }) {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
      } = useStopwatch({ autoStart: true , offsetTimestamp});
    
    
      return (
        <div className="watch-container">
           {days} : {hours} : {minutes} : {seconds}
        </div>
      );
}

export default Stopwatch;