import React, { useState } from 'react';
import RobotService from '../services/robot-service';

const robotService = new RobotService('http://localhost:3000');

function RobotRGBEffect() {
    const [RGBEffectID, setRGBEffectID] = useState('');
    const [RGBEffectName, setRGBEffectName] = useState('')
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const effectIds = {
        "No Effect": 0,
        "Rainbow": 1,
        "Continuous": 2,
        "Breath": 3,
        "Gradient": 4,
        "Flashing": 5,
        "Battery Level": 6
    };

    async function handlePostEffect(effectName) {
        const effectId = effectIds[effectName];
        try {
            setRGBEffectID(effectId);
            setRGBEffectName(effectName)
            const response = await robotService.postRGBEffect(effectId);
            setResult(response.result);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="card col-sm-12 col-md-6 col-lg-3 m-2">
            <label className="form-label">Select an RGB Effect:</label>
            <ul className="list-group mb-3">
                {Object.keys(effectIds).map(effectName => (
                    <li
                        key={effectName}
                        className="list-group-item list-group-item-action cursor-pointer"
                        onClick={() => handlePostEffect(effectName)}
                    >
                        {effectName}
                    </li>
                ))}
            </ul>

            {error &&
                <div className="alert alert-danger mt-3" role="alert">
                    Error: {error}
                </div>
            }

            {result &&
                <div className="alert alert-success mt-3" role="alert">
                    Applied Effect: {RGBEffectName}
                </div>
            }
        </div>

    );
}

export default RobotRGBEffect;
