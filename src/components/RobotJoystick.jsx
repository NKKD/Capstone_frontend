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
            linearX: movementData.y,
            linearY: -movementData.x,
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
        <div className="card col-sm-12 col-md-6 col-lg-3 m-2">
            <div className="d-flex justify-content-center">
                <Joystick
                    size={150}
                    sticky={false}
                    baseColor="blue"
                    stickColor="red"
                    move={handleMovementSubmit}
                    stop={handleEstopClick}
                />
            </div>
            <button className="btn btn-danger m-3" onClick={handleEstopClick}>
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

export default RobotJoystick;
