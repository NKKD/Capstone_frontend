import React, { useState } from 'react';
import RobotService from "../services/robot-service.js";
import RobotApp from "./RobotApp.jsx";

function RobotInfo() {
    const [robotStatus, setRobotStatus] = useState(null);
    const [robotIP, setRobotIP] = useState("192.168.0.167");
    const [robotPortNumber, setRobotPortNumber] = useState("9090");
    const [error, setError] = useState(null);
    const [isResponseOk, setIsResponseOk] = useState(false);

    const robotService = new RobotService("http://localhost:3000");

    async function fetchRobotInfo() {
        setError(null);
        setIsResponseOk(false);  // Resetting the state to handle consecutive calls

        try {
            const response = await robotService.getRobotConnection(robotIP, robotPortNumber);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRobotStatus(data);
            setIsResponseOk(true);
        } catch (err) {
            setError(err.message);
        }
    }

    if (isResponseOk) {
        return <RobotApp />;
    }

    return (
        <div className="col-sm-12 col-md-6 col-lg-6 m-2">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="robotIP">Enter Robot IP:</label>
                        <input
                            id="robotIP"
                            type="text"
                            value={robotIP}
                            onChange={(e) => setRobotIP(e.target.value)}
                            placeholder="Robot IP"
                            className="form-control text-center"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="robotPortNumber">Robot Port Number:</label>
                        <input
                            id="robotPortNumber"
                            type="text"
                            value={robotPortNumber}
                            onChange={(e) => setRobotPortNumber(e.target.value)}
                            placeholder="Enter Robot Port Number"
                            className="form-control text-center"
                        />
                    </div>
                    <button onClick={fetchRobotInfo} className="btn btn-primary m-2">
                        Fetch Robot Info
                    </button>
                    {robotStatus && <div className="mt-3">{robotStatus}</div>}
                    {error && <div className="mt-3 alert alert-danger">{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default RobotInfo;
