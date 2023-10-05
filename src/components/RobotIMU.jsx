import React, { useState } from 'react';
import RobotService from '../services/robot-service';

const robotService = new RobotService('http://localhost:3000');

function RobotIMU() {
    const [imuData, setImuData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchIMUData() {
        setError(null);

        try {
            const data = await robotService.getRobotIMU();
            setImuData(data);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={fetchIMUData}>
                Fetch IMU Data
            </button>
            {error && <p>Error: {error}</p>}

            {imuData && (
                <div>
                    <h2>IMU Data:</h2>
                    {/* Render your IMU data here. Assuming it has properties like x, y, z, but adjust as needed */}
                    <p>X: {imuData.orientation.x}</p>
                    <p>Y: {imuData.orientation.y}</p>
                    <p>Z: {imuData.orientation.z}</p>
                    {/* Add more properties if your IMU data has more fields */}
                </div>
            )}
        </div>
    );
}

export default RobotIMU;