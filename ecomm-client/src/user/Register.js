import React, { useState } from 'react';
import Layout from '../common/Layout';
import { register } from '../auth/index';

const FeedBack = ({ error }) => {
    if (error) return <div className="error-feedback">{error}</div>
    return <></>
}

const Register = () => {
    const [fields, setFields] = useState({
        name: '', email: '', password: '', password2: '', error: '', success: false
    })

    const handleChange = name => e => {
        setFields({ ...fields, error: false, [name]: e.target.value })
    }

    const handleClick = e => {
        e.preventDefault();
        const { name, email, password, password2 } = fields;
        register({ name, email, password, password2 }).then(data => {
            if (data.errors) {
                setFields({ ...fields, error: data.errors, success: false })
            } else {
                setFields({ ...fields, name: '', email: '', password: '', password2: '', error: '', success: true })
            }
        })
    }

    return (
        <Layout title='Register' description='Register to eComm app' className='container col-md-8 offset-md-2'>
            <form>
                <div className="form-group">
                    <label htmlFor="name" className="text-muted">Name</label>
                    <input type="text" name='name' className="form-control" onChange={handleChange('name')} />
                    <FeedBack error={fields.error['name']} />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="text-muted">Email</label>
                    <input type="email" name='email' className="form-control" onChange={handleChange('email')} />
                    <FeedBack error={fields.error['email']} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="text-muted">Password</label>
                    <input type="password" name='password' className="form-control" onChange={handleChange('password')} />
                    <FeedBack error={fields.error['password']} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2" className="text-muted">Confirm Password</label>
                    <input type="password" name='password2' className="form-control" onChange={handleChange('password2')} />
                    <FeedBack error={fields.error['password2']} />
                </div>
                <button className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </Layout>
    )
}

export default Register;