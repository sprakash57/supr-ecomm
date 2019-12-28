import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    return { color: '#fff' };
}

const Menu = ({ history }) => {
    return (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register" style={isActive(history, '/register')}>Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login" style={isActive(history, '/login')}>Login</Link>
            </li>
        </ul>
    )
}

export default withRouter(Menu);