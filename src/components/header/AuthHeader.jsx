import { NavLink } from "react-router-dom";
import "./Header.css";

const AuthHeader = () => {
    return (
        <>
            <header className="auth-header-content">
                <NavLink to="/" className="header-website-name">Clubbera</NavLink>
            </header>
        </>
    )
}

export default AuthHeader
