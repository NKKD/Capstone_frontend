import React, { useState, useEffect } from 'react';
import RobotService from '../services/robot-service';

const robotService = new RobotService('http://localhost:3000');

function RobotVoltage() {
    const [voltageData, setVoltageData] = useState(null);
    const [error, setError] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    async function fetchVoltageData() {
        setError(null);

        try {
            const data = await robotService.getRobotVoltage();
            setVoltageData(data);
        } catch (err) {
            setError(err.message);
        }
    }

    function startFetchingData() {
        if (!intervalId) {
            fetchVoltageData(); // Initial fetch
            const id = setInterval(fetchVoltageData, 60000); // Fetch every 1 minute
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

    const determineBackgroundColor = () => {
        if (voltageData) {
            if (voltageData.data < 10) {
                return 'red';
            } else if (voltageData.data > 11.5) {
                return 'green';
            }
        }
        return 'yellow';
    };

    return (
        <div className="card col-sm-12 col-md-6 col-lg-3 m-2">
            <div className="d-flex mb-3">
                <button className="btn btn-primary" onClick={startFetchingData}>
                    Start Fetching Voltage Data
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

            <div className="card mt-3" style={{ backgroundColor: determineBackgroundColor() }}>
                <div className="card-header">
                    Voltage Data
                </div>
                <div className="card-body">
                    {voltageData ? (
                        <p><strong>Voltage:</strong> {parseFloat(voltageData.data).toFixed(2)} V</p>
                    ) : (
                        <p className="text-muted">No voltage data received.</p>
                    )}
                </div>
            </div>
        </div>

    );
}

export default RobotVoltage;
