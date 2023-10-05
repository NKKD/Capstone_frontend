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

    async function handleSliderChange(property, value) {
        setRobotMovement(prevState => ({
            ...prevState,
            [property]: value
        }));

        try {
            const res = await robotService.postRobotMovement(robotMovement);
            setResult(res);
        } catch (err) {
            setError(err.message);
        }
    }

    function resetSlidersToZero() {
        setRobotMovement({
            linearX: 0,
            linearY: 0,
            angularZ: 0
        });
    }

    async function handleEstopClick() {
        try {
            const res = await robotService.postRobotEstop();
            setResult(res);
            resetSlidersToZero();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="card col-sm-12 col-md-6 col-lg-3 m-2">
            {['linearX', 'linearY', 'angularZ'].map(property => (
                <div className="slider-container mb-3" key={property}>
                    <label className="form-label">{property.charAt(0).toUpperCase() + property.slice(1)} Movement:</label>
                    <input
                        type="range"
                        className="form-range custom-range-lg"
                        min="-2"
                        max="2"
                        step="0.1"
                        value={robotMovement[property]}
                        onChange={e => handleSliderChange(property, e.target.value)}
                        onMouseUp={handleEstopClick}
                        onTouchEnd={handleEstopClick}
                        style={{ height: '2rem' }}
                    />
                </div>
            ))}
            <button className="btn btn-danger mb-3" onClick={handleEstopClick}>
                E-Stop
            </button>

            {error &&
                <div className="alert alert-danger mt-3" role="alert">
                    Error: {error}
                </div>
            }

            {result &&
                <div className="alert alert-success mt-3" role="alert">
                    {JSON.stringify(result.result)}
                </div>
            }
        </div>

    );
}

export default RobotSlider;
