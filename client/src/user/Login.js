import React, { useState } from 'react';
import Layout from '../common/Layout';
import { login, authenticate, isAuthenticated } from '../utils/auth';
import { Redirect } from 'react-router-dom';
import Loader from '../common/Loader';


const Login = () => {
    const { user } = isAuthenticated();
    const [fields, setFields] = useState({
        email: 'jhondoe@ecomm.in', password: '123456', error: '', message: '', redirectToOrigin: false, loading: false
    })

    const FeedBack = ({ error }) => {
        if (error) return <div className="error-feedback">{error}</div>
        return <></>
    }

    const ShowAlert = ({ message }) => (
        <div className="alert alert-danger text-center mt-2" style={{ display: message ? '' : 'none' }}>
            {message}
        </div>
    )

    const redirectUser = (redirectToOrigin) => {
        if (redirectToOrigin) {
            if (user && user.role === 1) return <Redirect to='/admin/dashboard' />
            return <Redirect to='/user/dashboard' />
        }

        if (isAuthenticated()) return <Redirect to='/' />
    }

    const handleChange = name => e => {
        setFields({ ...fields, error: false, [name]: e.target.value })
    }

    const handleClick = e => {
        e.preventDefault();
        const { email, password } = fields;
        setFields({ ...fields, loading: true });
        login({ email, password }).then(data => {
            if (data.errors || data.message) {
                setFields({ ...fields, error: data.errors, message: data.message, loading: false })
            } else {
                authenticate(data, () => {
                    setFields({ ...fields, error: '', message: '', redirectToOrigin: true, loading: false })
                })
            }
        })
    }

    const { email, password, redirectToOrigin, error, message, loading } = fields;
    return (
        <Layout title='Login' description='Login to eComm app' className='container col-md-8 offset-md-2'>
            <ShowAlert message={message} />
            <form>
                <div className="form-group">
                    <label htmlFor="email" className="text-muted">Email</label>
                    <input
                        type="email"
                        name='email'
                        value={email}
                        className={error['email'] ? "form-control red-border" : "form-control"}
                        onChange={handleChange('email')} />
                    <FeedBack error={error['email']} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="text-muted">Password</label>
                    <input
                        type="password"
                        name='password'
                        value={password}
                        className={error['password'] ? "form-control red-border" : "form-control"}
                        onChange={handleChange('password')} />
                    <FeedBack error={error['password']} />
                </div>
                {loading ? <Loader /> : <button className="btn btn-primary" onClick={handleClick}>Login</button>}
            </form>
            {redirectUser(redirectToOrigin)}
        </Layout>
    )
}

export default Login;