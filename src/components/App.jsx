import '../css/App.css'
import RobotConnection from "./RobotConnection.jsx";
import RobotApp from "./RobotApp.jsx";
import ProtectedLayout from './layouts/ProtectedLayout';
function App() {
  return (
    <ProtectedLayout>
        <RobotConnection/>
    </ProtectedLayout>
  )
}
export default App