import React from 'react';
import './Timer.css';
import { useTimer } from 'react-timer-hook';
import {
  useParams
} from "react-router-dom";

function Timer() {
    const { end } = useParams();
    const endTime = new Date(parseInt(end));
    const now = new Date();
    const difference =  now.getTime() - endTime.getTime();
    const offsetTimestamp = new Date();
    offsetTimestamp.setSeconds(offsetTimestamp.getSeconds() + difference/1000);
    const {
        seconds,
        minutes,
        hours,
        days,
        start
      } = useTimer({ autoStart: true, expiryTimestamp: offsetTimestamp});
      return (
        <div className="watch-container">
           {days} : {hours} : {minutes} : {seconds}
        </div>
      );
}

export default Timer;