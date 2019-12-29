import React, { useState } from 'react';
import Layout from '../common/Layout';
import { isAuthenticated } from '../auth/index';
import { createCategory } from './apiCalls'

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [alert, setAlert] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError('');
        setName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setAlert(false);
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setSuccess(false);
                } else {
                    setError('');
                    setSuccess(true);
                }
                setAlert(true);
            })
    }

    const CategoryForm = () => (
        <>
            <div className="col-md-8 offset-md-2">
                {alert && <ShowAlert />}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus />
                    </div>
                    <button className="btn btn-outline-primary">Create</button>
                </form>
            </div>

        </>
    )

    const ShowAlert = ({ success }) => (
        <div className={success ? "alert alert-success text-center" : "alert alert-danger text-center"}>
            {success ? `${name} is created` : `Category should be unique`}
        </div>
    )

    return (
        <Layout title='Create category' description='Add a new category'>
            <div className="row">
                <CategoryForm />
            </div>
        </Layout>
    )
}

export default AddCategory;