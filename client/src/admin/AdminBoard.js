import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import { isAuthenticated } from '../utils/auth';

const AdminBoard = () => {
    const AdminLinks = () => (
        <div className="card">
            <h4 className="card-header">Admin links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className='nav-link' to='/create/category'>Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link className='nav-link' to='/create/product'>Create Product</Link>
                </li>
                <li className="list-group-item">
                    <Link className='nav-link' to='/admin/orders'>All orders</Link>
                </li>
            </ul>
        </div>
    )
    const AdminInformation = ({ name, email, role }) => (
        <div className="card mb-5">
            <h3 className="card-header">Admin Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>
        </div>
    )
    const { user: { name, email, role } } = isAuthenticated();
    return (
        <Layout title='Dashboard' description={`Welcome ${name}`} className='container'>
            <div className="row">
                <div className="col-3">
                    <AdminLinks />
                </div>
                <div className="col-9">
                    <AdminInformation name={name} email={email} role={role} />
                </div>
            </div>
        </Layout>
    )
}

export default AdminBoard;