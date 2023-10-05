import React, { useState } from 'react';
import RobotService from '../services/robot-service';

const robotService = new RobotService('http://localhost:3000');

function RobotSlider() {
    const [robotMovement, setRobotMovement] = useState({
        linearX: 0,
        linearY: 0,
        angularZ: 0
    });
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    async function handleSliderChange(event) {
        const newAngularZ = event.target.value;

        setRobotMovement(prevState => ({
            ...prevState,
            angularZ: newAngularZ
        }));

        try {
            const res = await robotService.postRobotMovement(robotMovement);
            setResult(res);
        } catch (err) {
            setError(err.message);
        }
    }

    function resetSliderToZero() {
        setRobotMovement(prevState => ({
            ...prevState,
            angularZ: 0
        }));
    }

    async function handleEstopClick() {
        try {
            const res = await robotService.postRobotEstop();
            setResult(res);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleRelease() {
        resetSliderToZero();
        await handleEstopClick();
    }

    return (
        <div>
            <div className="slider-container">
                <label>Angular Z Movement:</label>
                <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={robotMovement.angularZ}
                    onChange={handleSliderChange}
                    onMouseUp={handleRelease}
                    onTouchEnd={handleRelease}
                />
            </div>
            <button onClick={handleEstopClick}>E-Stop</button>
            {error && <p>Error: {error}</p>}
            {result && <p>Response: {JSON.stringify(result)}</p>}
        </div>
    );
}

export default RobotSlider;
