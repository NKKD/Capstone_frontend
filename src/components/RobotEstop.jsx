import React, { useState } from 'react';
import RobotService from '../services/robot-service'; // Assuming your service is located in this path

const robotService = new RobotService('http://localhost:3000');

function RobotEstopController() {
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    async function handleEstopClick() {
        try {
            const res = await robotService.postRobotEstop();
            setResult(res);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <h2>Robot Emergency Stop</h2>
            <button onClick={handleEstopClick}>Activate E-Stop</button>
            {error && <div>Error: {error}</div>}
            {result && <div>Response: {JSON.stringify(result)}</div>}
        </div>
    );
}

export default RobotEstopController;
