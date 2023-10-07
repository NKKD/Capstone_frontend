import '../css/App.css'
import RobotIMU from "./RobotIMU.jsx";
import RobotVoltage from "./RobotVoltage.jsx";
import RobotRGBEffect from "./RobotRGBEffect.jsx";
import RobotJoystick from "./RobotJoystick.jsx";
import RobotAugularZMovement from "./RobotControlSlider.jsx";
function App() {
  return (
    <>
        <RobotVoltage/>
        <RobotJoystick/>
        <RobotIMU/>
        <RobotRGBEffect/>
        <RobotAugularZMovement/>
    </>
  )
}
export default App