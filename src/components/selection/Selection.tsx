import React from 'react';
import './Selection.css';

function Selection() {
  return (
    <div className="selection-container">
      <div className="option-container">
        <i className="option-icon bx bx-alarm-exclamation"></i>
        <h5 className="option-label"> Alarm </h5>
      </div>
      <div className="option-container">
        <i className="option-icon bx bx-timer"></i>
        <h5 className="option-label"> Timer </h5>
      </div>
      <div className="option-container">
        <i className="option-icon bx bx-stopwatch"></i>
        <h5 className="option-label"> Stopwatch </h5>
      </div>
    </div>
  );
}

export default Selection;
