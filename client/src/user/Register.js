import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import { register } from '../utils/auth';
import Loader from '../common/Loader';


const Register = () => {

    const [fields, setFields] = useState({
        name: '', email: '', password: '', password2: '', error: '', success: false
    })
    const [loader, setLoader] = useState(false);

    const FeedBack = ({ error }) => {
        if (error) return <div className="error-feedback">{error}</div>
        return <></>
    }

    const ShowSuceess = ({ success }) => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Suceesfully registered. Please <Link to='/login'>Login</Link>
        </div>
    )

    const handleChange = name => e => {
        setFields({ ...fields, error: false, [name]: e.target.value })
    }

    const handleClick = e => {
        e.preventDefault();
        const { name, email, password, password2 } = fields;
        setLoader(true);
        register({ name, email, password, password2 }).then(data => {
            if (data.errors) {
                setFields({ ...fields, error: data.errors, success: false });
            } else {
                setFields({ ...fields, name: '', email: '', password: '', password2: '', error: '', success: true })
            }
            setLoader(false);
        })
    }

    const { name, email, password, password2, success, error } = fields;
    return (
        <Layout title='Register' description='Register to eComm app' className='container col-md-8 offset-md-2'>
            <ShowSuceess success={success} />
            <form>
                <div className="form-group">
                    <label htmlFor="name" className="text-muted">Name</label>
                    <input
                        type="text"
                        name='name'
                        value={name}
                        className={fields.error['password2'] ? "form-control red-border" : "form-control"}
                        onChange={handleChange('name')} />
                    <FeedBack error={error['name']} />
                </div>
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
                <div className="form-group">
                    <label htmlFor="password2" className="text-muted">Confirm Password</label>
                    <input
                        type="password"
                        name='password2'
                        value={password2}
                        className={error['password2'] ? "form-control red-border" : "form-control"}
                        onChange={handleChange('password2')} />
                    <FeedBack error={error['password2']} />
                </div>
                {loader ? <Loader /> : <button className="btn btn-primary" onClick={handleClick}>Submit</button>}
            </form>
        </Layout>
    )
}

export default Register;