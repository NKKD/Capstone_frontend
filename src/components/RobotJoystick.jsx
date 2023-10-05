import React, { useState } from 'react';
import RobotService from '../services/robot-service';
import { Joystick } from 'react-joystick-component';

const robotService = new RobotService('http://localhost:3000');

function RobotJoystick() {
    const [robotMovement, setRobotMovement] = useState({
        linearX: 0,
        linearY: 0,
        angularZ: 0
    });
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    async function handleMovementSubmit(movementData) {
        // Update state with the new joystick movement data, if required
        setRobotMovement({
            linearX: movementData.x,  // Adjust based on the structure of movementData
            linearY: movementData.y,
            angularZ: robotMovement.angularZ
        });

        try {
            const res = await robotService.postRobotMovement(robotMovement);
            setResult(res);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleEstopClick() {
        try {
            const res = await robotService.postRobotEstop();
            setResult(res);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <Joystick
                size={100}
                sticky={false}
                baseColor="blue"
                stickColor="red"
                move={handleMovementSubmit}
                stop={handleEstopClick}
            />
            {error && <p>Error: {error}</p>}
            {result && <p>Response: {JSON.stringify(result)}</p>}
        </div>
    );
}

export default RobotJoystick;
