import React, { useState, useEffect } from 'react';
import RobotService from '../services/robot-service';

const robotService = new RobotService('http://localhost:3000');

function RobotIMU() {
    const [imuData, setImuData] = useState(null);
    const [error, setError] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    async function fetchIMUData() {
        setError(null);
        try {
            const data = await robotService.getRobotIMU();
            setImuData(data);
        } catch (err) {
            setError(err.message);
        }
    }

    function startFetchingData() {
        if (!intervalId) {
            fetchIMUData(); // Initial fetch
            const id = setInterval(fetchIMUData, 100); // Fetch every 100 ms
            setIntervalId(id);
        }
    }

    function stopFetchingData() {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    return (
        <div className="card col-sm-12 col-md-6 col-lg-3 m-2">
            <div className="d-flex mb-3">
                <button className="btn btn-primary" onClick={startFetchingData}>
                    Start Fetching IMU Data
                </button>
                <button className="btn btn-secondary ml-3" onClick={stopFetchingData}>
                    Stop Fetching
                </button>
            </div>

            {error &&
                <div className="alert alert-danger" role="alert">
                    Error: {error}
                </div>
            }

            <div className="card mt-3">
                <div className="card-header">
                    IMU Data
                </div>
                <div className="card-body">
                    {imuData ? (
                        <>
                            <p><strong>X:</strong> {parseFloat(imuData.orientation.x).toFixed(2)}</p>
                            <p><strong>Y:</strong> {parseFloat(imuData.orientation.y).toFixed(2)}</p>
                            <p><strong>Z:</strong> {parseFloat(imuData.orientation.z).toFixed(2)}</p>
                        </>
                    ) : (
                        <p className="text-muted">No IMU data received.</p>
                    )}
                </div>
            </div>
        </div>

    );
}

export default RobotIMU;
