import React, { useState, useEffect } from 'react';
import RobotService from '../services/robot-service';
import RobotDatabaseService from "../services/robot-database-service.js";
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);
import { Line } from 'react-chartjs-2';

const robotService = new RobotService('http://localhost:3000');
const robotDatabaseService = new RobotDatabaseService('http://localhost:9000');

function RobotVoltage() {
    const [voltageData, setVoltageData] = useState(null);
    const [error, setError] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [allVoltageData, setAllVoltageData] = useState([]);

    async function fetchVoltageData() {
        setError(null);

        try {
            const data = await robotService.getRobotVoltage();
            setVoltageData(data);
            // Check if data.data is a number and not NaN
            if (!isNaN(data.data) && typeof data.data === 'number') {
                await robotDatabaseService.createVoltageRecord(data);
            } else {
                // Optionally, handle the scenario where data is NaN
                console.warn("Received NaN voltage data. Not saving to database.");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    function startFetchingData() {
        if (!intervalId) {
            fetchVoltageData(); // Initial fetch
            const id = setInterval(fetchVoltageData, 60000*5); // Fetch every 5 minute
            setIntervalId(id);
        }
    }

    function stopFetchingData() {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }

    async function deleteAllVoltageRecords() {
        try {
            const records = await robotDatabaseService.deleteAllVoltageRecords();
            setAllVoltageData(records);
            console.log(records)
        } catch (err) {
            setError(err.message);
        }
    }

    async function fetchAllVoltageRecords() {
        try {
            const records = await robotDatabaseService.getVoltageRecord();
            setAllVoltageData(records);
            console.log(records)
        } catch (err) {
            setError(err.message);
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

    const getChartData = () => ({
        labels: allVoltageData.map(record => new Date(record.voltagePostDate).toLocaleTimeString()),
        datasets: [{
            label: 'Voltage Over Time',
            data: allVoltageData.map(record => parseFloat(record.voltage)),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
        }],
        options: {
            scales: {
                x: {
                    type: 'category',
                },
                y: {
                    type: 'linear',
                }
            }
        }
    });



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

            <div className="mt-3" style={{ backgroundColor: determineBackgroundColor() }}>
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

            <button className="btn btn-info m-3" onClick={fetchAllVoltageRecords}>
                Fetch All Voltage Records
            </button>


            {allVoltageData.length === 0 && (
                <div className="mt-3">
                    <p><strong>Voltage record is empty</strong></p>
                </div>
            )}

            {allVoltageData.length > 0 && (
                <div className="mt-3">
                    <Line data={getChartData()} options={{ maintainAspectRatio: false }} />
                </div>
            )}

            {allVoltageData.length > 0 && (
                <button className="btn btn-danger m-3" onClick={deleteAllVoltageRecords}>
                    Delete All Voltage Records
                </button>
            )}



        </div>

    );
}

export default RobotVoltage;
