import React, { useState } from 'react';
import './StopwatchSetter.css';
import { subDays, subHours, subMinutes, subSeconds, addDays, addHours, addMinutes, addSeconds } from 'date-fns';
import { useNavigate } from "react-router-dom";
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
    const [setterVisible, setSetterVisible] = useState(true);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [label, setLabel] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
    const navigateFunc = useNavigate();

    const navigate = (type: SelectionOptions) => {
        setErrorMessage("");
        let now = new Date();
        let timestamp;

        if (type === SelectionOptions.Stopwatch) {
            // For stopwatch: store the START time (past) so we can calculate elapsed
            // If all zeros, start from now
            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                timestamp = now;
            } else {
                timestamp = subSeconds(subMinutes(subHours(subDays(now, days), hours), minutes), seconds);
            }
        } else {
            // For timer: store the EXPIRY time (future) so everyone sees same countdown
            // If all zeros, set to now (will expire immediately)
            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                timestamp = now;
            } else {
                timestamp = addSeconds(addMinutes(addHours(addDays(now, days), hours), minutes), seconds);
            }
        }

        const location = type === SelectionOptions.Stopwatch ? "/stopwatch/" : "/timer/";
        const labelParam = label ? `?label=${encodeURIComponent(label)}` : '';
        navigateFunc(location + timestamp.getTime() + labelParam);
    }

    const setPresetTime = (presetMinutes: number) => {
        setDays(0);
        setHours(Math.floor(presetMinutes / 60));
        setMinutes(presetMinutes % 60);
        setSeconds(0);
        setSelectedPreset(presetMinutes);
    }

    const handleManualInput = (setter: Function, value: any) => {
        setter(value);
        setSelectedPreset(null);
    }

    return (
        <div className="controls-container">
            {setterVisible && (
                <>
                    <div className="label-input-container">
                        <input
                            type="text"
                            className="label-input"
                            placeholder="Timer name (optional)"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            maxLength={50}
                        />
                    </div>
                    <div className="input-container">
                        <input value={days} name="days" className="date-time-input" min={0} max={99} onChange={(el) => handleManualInput(setDays, enforceMinMax(el))} onKeyUp={enforceMinMax} placeholder="d" />
                        <span className="date-time-input">:</span>

                        <input value={hours} name="hours" className="date-time-input" min={0} max={23} onChange={(el) => handleManualInput(setHours, enforceMinMax(el))} onKeyUp={enforceMinMax} placeholder="h" />
                        <span className="date-time-input">:</span>

                        <input value={minutes} name="minutes" className="date-time-input" min={0} max={59} onChange={(el) => handleManualInput(setMinutes, enforceMinMax(el))} onKeyUp={enforceMinMax} placeholder="m" />
                        <span className="date-time-input">:</span>

                        <input value={seconds} name="seconds" className="date-time-input" min={0} max={59} onChange={(el) => handleManualInput(setSeconds, enforceMinMax(el))} onKeyUp={enforceMinMax} placeholder="s" />
                    </div>
                    <div className="preset-buttons">
                        <button className={`preset-btn ${selectedPreset === 5 ? 'selected' : ''}`} onClick={() => setPresetTime(5)}>5 min</button>
                        <button className={`preset-btn ${selectedPreset === 15 ? 'selected' : ''}`} onClick={() => setPresetTime(15)}>15 min</button>
                        <button className={`preset-btn ${selectedPreset === 30 ? 'selected' : ''}`} onClick={() => setPresetTime(30)}>30 min</button>
                        <button className={`preset-btn ${selectedPreset === 60 ? 'selected' : ''}`} onClick={() => setPresetTime(60)}>1 hour</button>
                    </div>
                </>
            )}
            { !setterVisible && <i className="option-icon bx bx-rewind" onClick={() => setSetterVisible(true)}></i>
            }
            <i onClick={() =>navigate(type)} className="option-icon bx bx-play"></i>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default StopwatchSetter;