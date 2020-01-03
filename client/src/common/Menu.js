import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logout, isAuthenticated } from '../utils/auth';

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
                <Link className="nav-link" to="/shop" style={isActive(history, '/shop')}>Shop</Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
                </li>
            ) : (
                    <li className="nav-item">
                        <Link className="nav-link" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>Dashboard</Link>
                    </li>
                )}

            {isAuthenticated() ?
                <li className="nav-item">
                    <span
                        onClick={() => logout(() => history.push('/'))}
                        className="nav-link"
                        style={{ cursor: 'pointer', color: '#fff' }}
                    >Logout</span>
                </li>
                :
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register" style={isActive(history, '/register')}>Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" style={isActive(history, '/login')}>Login</Link>
                    </li>
                </>}
        </ul>
    )
}

export default withRouter(Menu);