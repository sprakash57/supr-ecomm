import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import { isAuthenticated } from '../auth/index';

const UserBoard = () => {
    const UserLinks = () => (
        <div className="card">
            <h4 className="card-header">User links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className='nav-link' to='/cart'>My Cart</Link>
                </li>
                <li className="list-group-item">
                    <Link className='nav-link' to='/profile/update'>Update profile</Link>
                </li>
            </ul>
        </div>
    )
    const UserInformation = ({ name, email, role }) => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>
        </div>
    )
    const PurchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">history</li>
            </ul>
        </div>
    )
    const { user: { name, email, role } } = isAuthenticated();
    return (
        <Layout title='Dashboard' description={`Welcome ${name}`} className='container'>
            <div className="row">
                <div className="col-3">
                    <UserLinks />
                </div>
                <div className="col-9">
                    <UserInformation name={name} email={email} role={role} />
                    <PurchaseHistory />
                </div>
            </div>
        </Layout>
    )
}

export default UserBoard;