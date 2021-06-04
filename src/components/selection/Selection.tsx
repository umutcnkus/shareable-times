import classNames from 'classnames';
import React, { useState } from 'react';
import './Selection.css';

function Selection() {
  const [isEscaleted, setIsEscaleted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (i) => {
    setIsEscaleted(true);
    setSelectedIndex(i);
  }

  return (
    <div className={classNames(
      {
        'selection-container': true,
        'escelated': isEscaleted
      }
    )
    }>
      <div className={classNames({
        'option-container': true,
        'option-selected': selectedIndex == 0
      })} onClick={() => handleClick(0)}
      >
        <i className="option-icon bx bx-alarm-exclamation"></i>
        <h5 className="option-label"> Alarm </h5>
      </div>
      <div className={classNames({
        'option-container': true,
        'option-selected': selectedIndex == 1
      })} onClick={() => handleClick(1)}>
        <i className="option-icon bx bx-timer"></i>
        <h5 className="option-label"> Timer </h5>
      </div>
      <div className={classNames({
        'option-container': true,
        'option-selected': selectedIndex == 2
      })} onClick={() => handleClick(2)}>
        <i className="option-icon bx bx-stopwatch"></i>
        <h5 className="option-label"> Stopwatch </h5>
      </div>
    </div>
  );
}

export default Selection;
