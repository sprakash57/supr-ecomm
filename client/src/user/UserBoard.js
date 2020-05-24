import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import { isAuthenticated } from '../utils/auth';
import PurchaseHistory from './PurchaseHistory';
import { getPurchaseHistory } from '../utils/apiCalls';

const UserBoard = () => {

    const { user: { _id, name, email, role }, token } = isAuthenticated();

    const [history, setHistory] = useState([]);

    useEffect(() => {
        getPurchaseHistory(_id, token).then(data => {
            if (data.error) alert(data.error);
            setHistory(data);
        })
    }, [])

    const userLinks = () => (
        <div className="card">
            <h4 className="card-header">User links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className='nav-link' to='/cart'>My Cart</Link>
                </li>
                <li className="list-group-item">
                    <Link className='nav-link' to={`/profile/${_id}`}>Update profile</Link>
                </li>
            </ul>
        </div>
    )
    const userInformation = (name, email, role) => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>
        </div>
    )
    return (
        <Layout title='Dashboard' description={`Welcome ${name}`} className='container'>
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInformation(name, email, role)}
                    {history && <PurchaseHistory history={history} />}
                </div>
            </div>
        </Layout>
    )
}

export default UserBoard;