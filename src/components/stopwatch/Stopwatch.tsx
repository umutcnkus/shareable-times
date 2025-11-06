import React, { useState, useEffect, useCallback } from 'react';
import './Stopwatch.css';
import { useStopwatch } from 'react-timer-hook';
import {
  useParams,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';

function Stopwatch() {
    const { start } = useParams<{ start: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [copySuccess, setCopySuccess] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const label = searchParams.get('label') || '';
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
        // Don't trigger if typing in an input
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

        switch(e.key.toLowerCase()) {
          case ' ':
            e.preventDefault();
            isRunning ? pause() : startTimer();
            break;
          case 'c':
            if (e.ctrlKey || e.metaKey) return; // Allow normal copy
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
    }, [isRunning, pause, startTimer, copyToClipboard, toggleFullscreen]);

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
              <button className="control-btn" onClick={startTimer}>
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

export default Stopwatch;