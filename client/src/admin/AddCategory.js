import React, { useState } from 'react';
import Layout from '../common/Layout';
import { isAuthenticated } from '../utils/auth';
import { createCategory } from '../utils/apiCalls'
import { Link } from 'react-router-dom';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);
    const [alert, setAlert] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setAlert(false);
        setName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setSuccess(false);
                } else {
                    setSuccess(true);
                }
                setAlert(true);
            })
    }

    const GoBack = () => <Link to='/admin/dashboard'>Back</Link>

    const CategoryForm = () => (
        <>
            <div className="col-md-8 offset-md-2">
                {alert && <ShowAlert success={success} />}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-11">
                                <label className="text-muted">Name</label>
                            </div>
                            <div className="col-md-1">
                                <GoBack />
                            </div>
                        </div>
                        <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus />
                    </div>
                    <button className="btn btn-outline-primary mr-3">Create</button>
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