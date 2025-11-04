import React, { useState } from 'react';
import './Timer.css';
import { useTimer } from 'react-timer-hook';
import {
  useParams
} from "react-router-dom";

function Timer() {
    const { end } = useParams();
    const [copySuccess, setCopySuccess] = useState(false);
    const endTime = new Date(parseInt(end));
    const now = new Date();
    const difference =  now.getTime() - endTime.getTime();
    const offsetTimestamp = new Date();
    offsetTimestamp.setSeconds(offsetTimestamp.getSeconds() + difference/1000);
    const {
        seconds,
        minutes,
        hours,
        days
      } = useTimer({ autoStart: true, expiryTimestamp: offsetTimestamp});

    const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    };

      return (
        <div className="watch-page">
          <div className="watch-container">
            {days} : {hours} : {minutes} : {seconds}
          </div>
          <button className="copy-button" onClick={copyToClipboard}>
            <i className='bx bx-link-alt'></i>
            {copySuccess ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      );
}

export default Timer;