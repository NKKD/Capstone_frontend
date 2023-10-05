import '../css/App.css'
import RobotConnection from "./RobotConnection.jsx";
import RobotIMU from "./RobotIMU.jsx";
import RobotVoltage from "./RobotVoltage.jsx";
import RobotRGBEffect from "./RobotRGBEffect.jsx";
import RobotMovementControl from "./RobotMovement.jsx";
import RobotEstop from "./RobotEstop.jsx";
function App() {
  return (
    <>
        <RobotConnection/>
        <RobotIMU/>
        <RobotVoltage/>
        <RobotRGBEffect/>
        <RobotMovementControl/>
        <RobotEstop/>
    </>
  )
}
export default App