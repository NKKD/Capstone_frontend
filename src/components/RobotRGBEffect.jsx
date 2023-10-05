import React, { useState } from 'react';
import RobotService from '../services/robot-service';

const robotService = new RobotService('http://localhost:3000');

function RobotRGBEffect() {
    const [RGBEffectID, setRGBEffectID] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    async function handlePostEffect() {
        try {
            const response = await robotService.postRGBEffect(RGBEffectID);
            setResult(response.result);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <label htmlFor="rgbEffectID">Enter RGB Effect ID:</label>
            <input
                type="text"
                id="rgbEffectID"
                value={RGBEffectID}
                onChange={e => setRGBEffectID(e.target.value)}
                className="form-control"
            />
            <button onClick={handlePostEffect} className="btn btn-primary mt-2">
                Apply Effect
            </button>

            {error && <p className="text-danger mt-2">Error: {error}</p>}

            {result && (
                <div className="mt-4">
                    <p>Applied Effect ID: {result}</p>
                </div>
            )}
        </div>
    );
}

export default RobotRGBEffect;
