import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import Layout from '../common/Layout';
import { readUser, updateUser, upateUserLocalInfo } from '../utils/apiCalls';
import { Redirect } from 'react-router-dom';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    })
    const { name, email, password, success } = values;
    const { token } = isAuthenticated();

    const init = userId => {
        readUser(userId, token).then(data => {
            if (data.error) setValues({ ...values, error: true })
            else setValues({ ...values, name: data.name, email: data.email })
        })
    }

    useEffect(() => {
        init(match.params.userId)
    }, [])

    const handleChange = field => e => {
        setValues({ ...values, [field]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        updateUser(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) console.log(data.error);
            else {
                upateUserLocalInfo(data, () => {
                    setValues({ ...values, name: data.name, email: data.email, success: true })
                })
            }
        })
    }

    const redirectUser = success => {
        if (success) return <Redirect to='/user/dashboard' />
    }

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={handleChange("name")} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange("email")} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handleChange("password")} />
            </div>
            <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </form>
    )

    return (
        <Layout title='User Profile' description='View/Update your profile'>
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
}

export default Profile;