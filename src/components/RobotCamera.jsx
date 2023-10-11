import React, { useState } from 'react';

function VideoStreamComponent() {
    const [robotIP, setRobotIP] = useState('');
    const [streamUrl, setStreamUrl] = useState('');

    const getCameraStreamUrl = (ip, port = '8080') => {
        if (!ip) {
            throw new Error('Robot IP not provided');
        }
        return `http://${ip}:${port}/stream_viewer?topic=/usb_cam/image_raw`;
    //     http://192.168.0.197:8080/stream_viewer?topic=/usb_cam/image_raw/compressed
    //     http://192.168.0.197:8080/stream_viewer?topic=/usb_cam/image_raw
    }

    const handleStartStream = () => {
        try {
            const url = getCameraStreamUrl(robotIP);
            setStreamUrl(url);
            console.log(url)
        } catch (error) {
            console.error("Failed to generate stream URL:", error);
        }
    }

    const handleStopStream = () => {
        setStreamUrl(''); // Clearing the stream URL stops the stream display
    }

    return (
        <div className="card col-sm-12 col-md-6 col-lg-6 m-2">
            <div>
                <div className="form-group m-2">
                    <label htmlFor="robotIP">Robot IP:</label>
                    <input
                        type="text"
                        id="robotIP"
                        className="form-control"
                        value={robotIP}
                        onChange={e => setRobotIP(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary m-2" onClick={handleStartStream}>Start Stream</button>
                    <button className="btn btn-danger m-2" onClick={handleStopStream}>Stop Stream</button>
                </div>
            </div>

            <div className="iframe-container">
                <iframe
                    src={streamUrl}
                    style={{
                        width: '100%',
                        maxWidth: '640px',
                        height: '480px',
                        border: 0
                    }}
                    title="Webcam Stream"
                ></iframe>
            </div>
        </div>
    );
}

export default VideoStreamComponent;
