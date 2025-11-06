import React, { useState, useEffect } from 'react';
import './Timer.css';
import { useTimer } from 'react-timer-hook';
import {
  useParams,
  useNavigate
} from "react-router-dom";

function Timer() {
    const { end } = useParams<{ end: string }>();
    const navigate = useNavigate();
    const [copySuccess, setCopySuccess] = useState(false);
    const [hasExpired, setHasExpired] = useState(false);
    const endTime = new Date(parseInt(end || '0'));
    const now = new Date();
    const difference =  now.getTime() - endTime.getTime();
    const offsetTimestamp = new Date();
    offsetTimestamp.setSeconds(offsetTimestamp.getSeconds() + difference/1000);

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        pause,
        resume
      } = useTimer({
        autoStart: true,
        expiryTimestamp: offsetTimestamp,
        onExpire: () => {
          setHasExpired(true);
          playSound();
        }
      });

    useEffect(() => {
      if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
        setHasExpired(true);
      }
    }, [seconds, minutes, hours, days]);

    const playSound = () => {
      // Create a simple beep sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    };

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
          {hasExpired && (
            <div className="expired-message">
              <i className='bx bx-alarm-exclamation' style={{ fontSize: '2.5rem', marginRight: '1rem' }}></i>
              Time's Up!
            </div>
          )}
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
              <button className="control-btn" onClick={resume}>
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

export default Timer;