import React, { useState, useEffect, useCallback } from 'react';
import './Timer.css';
import { useTimer } from 'react-timer-hook';
import {
  useParams,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';

function Timer() {
    const { end } = useParams<{ end: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [copySuccess, setCopySuccess] = useState(false);
    const [hasExpired, setHasExpired] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const label = searchParams.get('label') || '';

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
        restart
      } = useTimer({
        autoStart: true,
        expiryTimestamp: offsetTimestamp,
        onExpire: () => {
          setHasExpired(true);
          playSound();
          sendNotification();
        }
      });

    useEffect(() => {
      if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
        setHasExpired(true);
      }
    }, [seconds, minutes, hours, days]);

    // Request notification permission on mount
    useEffect(() => {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationsEnabled(permission === 'granted');
        });
      } else if ('Notification' in window && Notification.permission === 'granted') {
        setNotificationsEnabled(true);
      }
    }, []);

    const playSound = () => {
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

    const sendNotification = () => {
      if ('Notification' in window && Notification.permission === 'granted') {
        const notificationTitle = label || 'Timer';
        const notificationOptions = {
          body: 'Time\'s up!',
          icon: '/shareable-times/logo192.png',
          badge: '/shareable-times/logo192.png',
          tag: 'timer-notification',
          requireInteraction: true,
        };

        try {
          new Notification(notificationTitle, notificationOptions);
        } catch (error) {
          console.error('Notification failed:', error);
        }
      }
    };

    const copyToClipboard = useCallback(() => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }, []);

    const toggleFullscreen = useCallback(() => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }, []);

    const formatNumber = (num: number) => String(num).padStart(2, '0');

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

        switch(e.key.toLowerCase()) {
          case ' ':
            e.preventDefault();
            isRunning ? pause() : restart(offsetTimestamp);
            break;
          case 'c':
            if (e.ctrlKey || e.metaKey) return;
            copyToClipboard();
            break;
          case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
          case 'q':
            setShowQR(prev => !prev);
            break;
          case '?':
            setShowShortcuts(prev => !prev);
            break;
          case 'escape':
            setShowQR(false);
            setShowShortcuts(false);
            break;
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isRunning, pause, restart, offsetTimestamp, copyToClipboard, toggleFullscreen]);

    // Fullscreen change listener
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

      return (
        <div className="watch-page">
          <button className="back-button" onClick={() => navigate('/')}>
            <i className='bx bx-home'></i>
            <span>Home</span>
          </button>

          <button className="shortcuts-hint" onClick={() => setShowShortcuts(true)}>
            <i className='bx bx-keyboard'></i>
            <span>Press ? for shortcuts</span>
          </button>

          {hasExpired && (
            <div className="expired-message">
              <i className='bx bx-alarm-exclamation' style={{ fontSize: '2.5rem', marginRight: '1rem' }}></i>
              Time's Up!
            </div>
          )}

          {label && <div className="timer-label">{label}</div>}

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
              <button className="control-btn" onClick={() => restart(offsetTimestamp)}>
                <i className='bx bx-play'></i>
                <span>Resume</span>
              </button>
            )}
            <button className="copy-button" onClick={copyToClipboard}>
              <i className='bx bx-link-alt'></i>
              <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <button className="control-btn" onClick={() => setShowQR(true)}>
              <i className='bx bx-qr'></i>
              <span>QR Code</span>
            </button>
            <button className="control-btn" onClick={toggleFullscreen}>
              <i className={`bx ${isFullscreen ? 'bx-exit-fullscreen' : 'bx-fullscreen'}`}></i>
              <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
            </button>
          </div>

          {notificationsEnabled && (
            <div className="notification-badge">
              <i className='bx bx-bell'></i>
              <span>Notifications On</span>
            </div>
          )}

          {/* QR Code Modal */}
          {showQR && (
            <div className="modal-overlay" onClick={() => setShowQR(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowQR(false)}>
                  <i className='bx bx-x'></i>
                </button>
                <h3>Scan to Open Timer</h3>
                <div className="qr-container">
                  <QRCodeSVG
                    value={window.location.href}
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="qr-hint">Scan with your phone camera</p>
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Modal */}
          {showShortcuts && (
            <div className="modal-overlay" onClick={() => setShowShortcuts(false)}>
              <div className="modal-content shortcuts-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowShortcuts(false)}>
                  <i className='bx bx-x'></i>
                </button>
                <h3>Keyboard Shortcuts</h3>
                <div className="shortcuts-list">
                  <div className="shortcut-item">
                    <kbd>Space</kbd>
                    <span>Pause / Resume</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>C</kbd>
                    <span>Copy Link</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>F</kbd>
                    <span>Toggle Fullscreen</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Q</kbd>
                    <span>Show QR Code</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>?</kbd>
                    <span>Show This Help</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Esc</kbd>
                    <span>Close Modals</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default Timer;
