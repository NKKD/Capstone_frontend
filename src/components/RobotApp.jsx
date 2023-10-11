import '../css/App.css'
import RobotIMU from "./RobotIMU.jsx";
import RobotVoltage from "./RobotVoltage.jsx";
import RobotRGBEffect from "./RobotRGBEffect.jsx";
import RobotJoystick from "./RobotJoystick.jsx";
import RobotAugularZMovement from "./RobotControlSlider.jsx";
import WebcamStream from "./RobotCamera.jsx";
function App() {
  return (
    <div className="robotApp">
        <RobotVoltage/>
        <RobotJoystick/>
        <RobotIMU/>
        <RobotRGBEffect/>
        <RobotAugularZMovement/>
        <WebcamStream/>
    </div>
  )
}
export default App