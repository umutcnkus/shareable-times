import React from 'react';
import './Stopwatch.css';
import { useStopwatch } from 'react-timer-hook';
import {
  useParams
} from "react-router-dom";

function Stopwatch() {
    const { start } = useParams();
    const startTime = new Date(parseInt(start));
    const now = new Date();
    const difference =  now.getTime() - startTime.getTime();
    const offsetTimestamp = new Date();
    offsetTimestamp.setSeconds(offsetTimestamp.getSeconds() + difference/1000);
    const {
        seconds,
        minutes,
        hours,
        days,
      } = useStopwatch({ autoStart: true , offsetTimestamp: offsetTimestamp});
    
    
      return (
        <div className="watch-container">
           {days} : {hours} : {minutes} : {seconds}
        </div>
      );
}

export default Stopwatch;