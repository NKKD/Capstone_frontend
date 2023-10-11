import React, { useState } from 'react';
import RobotService from "../services/robot-service.js";
import RobotApp from "./RobotApp.jsx";
import '../css/RobotConnection.css'

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
            console.log(response)
            setRobotStatus(response);
            setIsResponseOk(true);
        } catch (err) {
            setError(err.message);
        }
    }


    return (
        isResponseOk
            ? <RobotApp />
            : (
                <div className="robot-connection-div">
                    <div className="m-2">
                        <div className="robot-ip-and-port-form m-2">
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
                                    Connect To Robot
                                </button>
                                {error && <div className="mt-3 alert alert-danger">{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            )
    );
}

export default RobotInfo;
