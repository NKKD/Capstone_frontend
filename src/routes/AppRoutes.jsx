// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto child components

import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import PageNotFound from "../pages/PageNotFound"
import LogoutPage from '../pages/LogoutPage';
import ProfilePage from '../pages/ProfilePage';
import App from '../components/App'

// child components using {...props}
export default function AppRoutes(props) {

    return (
        <Routes>
            <Route path="login" element={<LoginPage/>} />

            {/* index matches on default/home URL: / */}
            <Route index element={
                <ProtectedRoute>
                    <App {...props} />
                </ProtectedRoute>
            }/>


            <Route path='/profile' element={
                <ProtectedRoute>
                    <ProfilePage {...props} />
                </ProtectedRoute>
            }/>

            <Route path="logout" element={
                <ProtectedRoute>
                    <LogoutPage/>
                </ProtectedRoute>
            }/>


            {/* special route to handle if none of the above match */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
// Name this file AppRoutes.jsx and store in 'routes' folder