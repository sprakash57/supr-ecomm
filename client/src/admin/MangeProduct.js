import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import { isAuthenticated } from '../utils/auth';
import { getAllProducts, deleteProduct } from '../utils/apiCalls';

const ManageProduct = () => {

    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getAllProducts().then(data => {
            if (data.error) console.log(data.error);
            else setProducts(data)
        })
    }

    const removeProduct = (prodId) => {
        deleteProduct(prodId, user._id, token).then(data => {
            if (data.error) console.log(data.error)
            else loadProducts();
        })
    }

    useEffect(() => {
        loadProducts();
    }, [])



    return (
        <Layout title='Manage products' description={`This space will let you manage all available products`} className='container'>
            <div className="row">
                <div className="col-12">
                    <div className="h2 text-centered">Total {products.length} products found</div>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, pIndex) => <li key={pIndex} className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{p.name}</strong>
                            <Link to={`/admin/product/update/${p._id}`}>
                                <span className="badge badge-warning badge-pill">Update</span>
                            </Link>
                            <span onClick={() => removeProduct(p._id)} className="badge badge-danger badge-pill cursor-pointer">Delete</span>
                        </li>)}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ManageProduct;