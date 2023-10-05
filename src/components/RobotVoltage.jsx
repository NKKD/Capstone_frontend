import React, { useState } from 'react';
import RobotService from '../services/robot-service';

const robotService = new RobotService('http://localhost:3000');

function RobotVoltage() {
    const [voltageData, setVoltageData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchVoltageData() {
        setError(null);

        try {
            const data = await robotService.getRobotVoltage();
            setVoltageData(data);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={fetchVoltageData}>
                Fetch Voltage Data
            </button>
            {error && <p>Error: {error}</p>}

            {voltageData && (
                <div>
                    <h2>Voltage Data:</h2>
                    <p>Voltage: {voltageData.data} V</p>
                </div>
            )}
        </div>
    );
}

export default RobotVoltage;
