import { useContext } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { MyThemeContext } from '../context/MyThemeContext'
import { useAuthenticator } from '@aws-amplify/ui-react';


export default function NavBar() {
    const { theme } = useContext(MyThemeContext);
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();

    function logOut() {
        signOut();
        navigate("/login");
    }

    return (
        <>
            <nav className="NavBar"
                 style={{ backgroundColor: theme.background, color: theme.foreground }}>
                <ul className="menu">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/logout">Logout</NavLink></li>
                    <li><NavLink to="/profile"><span>{user.attributes.name}</span></NavLink></li>
                </ul>
            </nav>
        </>
    );
}