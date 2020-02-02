import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { isAuthenticated } from '../utils/auth';
import { getCategories, getOneProduct, updateProduct } from '../utils/apiCalls';
import Loader from '../common/Loader';

const ShowAlert = ({ error, prod }) => (
    <div className={error ? "alert alert-danger text-center" : "alert alert-success text-center"}>
        {error ? error : `${prod} is updated`}
    </div>
)

const UpdateProduct = ({ match }) => {
    const [alert, setAlert] = useState(false);
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        updatedProduct: '',
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        category,
        shipping,
        quantity,
        loading,
        error,
        updatedProduct,
        formData
    } = values;
    // load categories and set form data
    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setAlert(true)
                setValues({ ...values, error: data.error });
            }
            else setCategories(data);
        });
    };

    const loadProduct = id => {
        getOneProduct(id).then(data => {
            if (data.error) setValues({ ...values, error: data.error })
            else setValues({
                ...values,
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category._id,
                shipping: data.shipping,
                quantity: data.quantity,
                formData: new FormData()
            })
            loadCategories();
        })
    }

    useEffect(() => {
        loadProduct(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setAlert(false);
        setValues({ ...values, error: '', loading: true });
        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
                setAlert(true);
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    category: '',
                    error: '',
                    updatedProduct: data.name,
                });
                setAlert(true);
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h4>Update image</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control" value={category}>
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control" value={shipping}>
                    <option>Please select</option>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>
            {loading ? <Loader /> : <button className="btn btn-outline-primary">Update</button>}
        </form>
    );

    return (
        <Layout title="Update product" description={`Update product details`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {alert && <ShowAlert error={error} prod={updatedProduct} />}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;