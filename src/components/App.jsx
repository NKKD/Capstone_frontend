import '../css/App.css'
import RobotConnection from "./RobotConnection.jsx";
import RobotApp from "./RobotApp.jsx";
function App() {
  return (
    <>
        <RobotConnection/>
        {/*for testing purpose, enable RobotApp to see every component*/}
        <RobotApp/>
    </>
  )
}
export default App