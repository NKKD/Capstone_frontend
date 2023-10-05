import React, { useState } from 'react';
import RobotService from "../services/robot-service.js";

const robotService = new RobotService("http://localhost:3000");

function RobotInfo() {
    const [robotStatus, setRobotStatus] = useState(null);
    const [robotIP, setRobotIP] = useState("192.168.0.167");
    const [robotPortNumber, setRobotPortNumber] = useState("9090");
    const [error, setError] = useState(null);

    async function fetchRobotInfo() {
        setError(null);

        try {
            const response = await robotService.getRobotConnection(robotIP,robotPortNumber)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRobotStatus(data);
            console.log(response)
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <div>
                <label>
                    Robot IP:
                    <input
                        type="text"
                        value={robotIP}
                        onChange={(e) => setRobotIP(e.target.value)}
                        placeholder="Enter Robot IP"
                    />
                </label>
                <label>
                    Robot Port Number:
                    <input
                        type="text"
                        value={robotPortNumber}
                        onChange={(e) => setRobotPortNumber(e.target.value)}
                        placeholder="Enter Robot Port Number"
                    />
                </label>
                <button onClick={fetchRobotInfo}>
                    Fetch Robot Info
                </button>
                {robotStatus && <div> {robotStatus} </div>}
                {error && <div> {robotStatus} </div>}
            </div>
        </div>
    );
}

export default RobotInfo;
