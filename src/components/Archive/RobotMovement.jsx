import React, { useState } from 'react';
import RobotService from '../../services/robot-service.js'; // Assuming your service is located in this path

const robotService = new RobotService('http://localhost:3000');

function RobotMovementControl() {
    const [robotMovement, setRobotMovement] = useState({
        linearX: 0,
        linearY: 0,
        angularZ: 0
    });
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    async function handleMovementSubmit() {
        try {
            const res = await robotService.postRobotMovement(robotMovement);
            setResult(res);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <h2>Control Robot Movement</h2>
            <div>
                <label>Linear X: </label>
                <input
                    type="number"
                    value={robotMovement.linearX}
                    onChange={(e) => setRobotMovement({ ...robotMovement, linearX: e.target.value })}
                />
            </div>
            <div>
                <label>Linear Y: </label>
                <input
                    type="number"
                    value={robotMovement.linearY}
                    onChange={(e) => setRobotMovement({ ...robotMovement, linearY: e.target.value })}
                />
            </div>
            <div>
                <label>Angular Z: </label>
                <input
                    type="number"
                    value={robotMovement.angularZ}
                    onChange={(e) => setRobotMovement({ ...robotMovement, angularZ: e.target.value })}
                />
            </div>
            <button onClick={handleMovementSubmit}>Submit Movement</button>
            {error && <div>Error: {error}</div>}
            {result && <div>Response: {JSON.stringify(result)}</div>}
        </div>
    );
}



export default RobotMovementControl;
