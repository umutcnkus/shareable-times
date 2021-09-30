import classNames from 'classnames';
import React, { useState } from 'react';
import StopwatchSetter from '../stopwatch-setter/StopwatchSetter';
import './Selection.css';

export enum SelectionOptions {
  Alarm = 'Alarm',
  Timer = 'Timer',
  Stopwatch = 'Stopwatch'
}

function Selection() {
  const [isEscaleted, setIsEscaleted] = useState(false);
  const [selection, setSelection] = useState(null);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  const selections = [
    {
      name: SelectionOptions.Timer,
      icon: 'bx bx-timer'
    }, 
    {
      name: SelectionOptions.Alarm,
      icon: 'bx bx-alarm-exclamation'
    }, 
    {
      name: SelectionOptions.Stopwatch,
      icon: 'bx bx-stopwatch'
    } 
];

  const handleClick = (i, val) => {
    setIsEscaleted(true);
    setSelection(val.name);
  }

  return (
    <div className='main-container'>
      <div className={classNames({'selection-container': true,'escelated': isEscaleted})} onTransitionEnd={(e) => setIsAnimationEnd(true)}>
        {
          selections.map((val, i) => 
            <div onTransitionEnd={(e)=>e.stopPropagation()} className={classNames({
              'option-container': true,
              'option-selected': selection === val.name
            })} onClick={() => handleClick(i, val)}
            >
              <i className={classNames({'option-icon bx': true, [val.icon]: true})}></i>
              <h5 className='option-label'> {val.name} </h5>
            </div>
          )
        }
      </div>
      <div className={classNames({'setter-container': true, 'escelated': true})}>
      {isAnimationEnd && <StopwatchSetter type={selection}></StopwatchSetter>}
      </div>
    </div>
  );
}

export default Selection;
