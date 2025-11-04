import React, { useState } from 'react';
import './StopwatchSetter.css';
import moment from "moment"
import { useHistory } from "react-router-dom";
import { SelectionOptions } from '../selection/Selection';


const enforceMinMax = (el) => {
    if (el.target.value !== "") {
        if (isNaN(filterInt(el.target.value)) || filterInt(el.target.value) === 0) {
            el.target.value = el.target.min;
        }
        if (filterInt(el.target.value) < filterInt(el.target.min)) {
            el.target.value = el.target.min;
        }
        if (filterInt(el.target.value) > filterInt(el.target.max)) {
            el.target.value = el.target.max;
        }
        return el.target.value;
    }
}

const filterInt = (value) => {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value)
    } else {
        return NaN
    }
}


function StopwatchSetter({ type }) {
    const [setterVisible, setSetterVisible] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    let history = useHistory();

    const navigate = (type: SelectionOptions) => {
        // Validate that at least some time is set
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            setErrorMessage("Please set a time value!");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        setErrorMessage("");
        let now = new Date();
        let start = moment(now);
        let end = moment(start).subtract(days, "days").subtract(hours, "hours").subtract(minutes, "minutes").subtract(seconds, "seconds");
        const location = type === SelectionOptions.Stopwatch ? "/stopwatch/" : "/timer/"
        history.push(location + end.toDate().getTime());
    }

    const setPresetTime = (presetMinutes: number) => {
        setDays(0);
        setHours(Math.floor(presetMinutes / 60));
        setMinutes(presetMinutes % 60);
        setSeconds(0);
    }

    return (
        <div className="controls-container">
            {setterVisible && <div className="input-container">
                <input defaultValue="0" name="days" className="date-time-input" min={0} max={99} onChange={(el) => setDays(enforceMinMax(el))} onKeyUp={enforceMinMax} placeholder="d" />
                <span className="date-time-input">:</span>

                <input defaultValue="0" name="hours" className="date-time-input" min={0} max={23} onChange={(el) => setHours(enforceMinMax(el))} onKeyUp={enforceMinMax} placeholder="h" />
                <span className="date-time-input">:</span>

                <input defaultValue="0" name="minutes" className="date-time-input" min={0} max={59} onChange={(el) => setMinutes(enforceMinMax(el))} onKeyUp={enforceMinMax} placeholder="m" />
                <span className="date-time-input">:</span>

                <input defaultValue="0" name="seconds" className="date-time-input" min={0} max={59} onChange={(el) => setSeconds(enforceMinMax(el))} onKeyUp={enforceMinMax} placeholder="s" />
            </div>
            }
            {setterVisible && <div className="preset-buttons">
                <button className="preset-btn" onClick={() => setPresetTime(5)}>5 min</button>
                <button className="preset-btn" onClick={() => setPresetTime(15)}>15 min</button>
                <button className="preset-btn" onClick={() => setPresetTime(30)}>30 min</button>
                <button className="preset-btn" onClick={() => setPresetTime(60)}>1 hour</button>
            </div>
            }
            { !setterVisible && <i className="option-icon bx bx-rewind" onClick={() => setSetterVisible(true)}></i>
            }
            <i onClick={() =>navigate(type)} className="option-icon bx bx-play"></i>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default StopwatchSetter;