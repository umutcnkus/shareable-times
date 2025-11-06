import React, { useState } from 'react';
import './Stopwatch.css';
import { useStopwatch } from 'react-timer-hook';
import {
  useParams,
  useNavigate
} from "react-router-dom";

function Stopwatch() {
    const { start } = useParams<{ start: string }>();
    const navigate = useNavigate();
    const [copySuccess, setCopySuccess] = useState(false);
    const startTime = new Date(parseInt(start || '0'));
    const now = new Date();
    const difference =  now.getTime() - startTime.getTime();
    const offsetTimestamp = new Date();
    offsetTimestamp.setSeconds(offsetTimestamp.getSeconds() + difference/1000);
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        pause,
        start: startTimer
      } = useStopwatch({ autoStart: true , offsetTimestamp: offsetTimestamp});

    const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    };

    const formatNumber = (num: number) => String(num).padStart(2, '0');

      return (
        <div className="watch-page">
          <button className="back-button" onClick={() => navigate('/')}>
            <i className='bx bx-home'></i>
            <span>Home</span>
          </button>
          <div className="watch-container">
            {days > 0 && `${days} : `}{formatNumber(hours)} : {formatNumber(minutes)} : {formatNumber(seconds)}
          </div>
          <div className="control-buttons">
            {isRunning ? (
              <button className="control-btn pause-btn" onClick={pause}>
                <i className='bx bx-pause'></i>
                <span>Pause</span>
              </button>
            ) : (
              <button className="control-btn" onClick={startTimer}>
                <i className='bx bx-play'></i>
                <span>Resume</span>
              </button>
            )}
            <button className="copy-button" onClick={copyToClipboard}>
              <i className='bx bx-link-alt'></i>
              <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      );
}

export default Stopwatch;