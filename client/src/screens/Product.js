import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { getOneProduct, getRelatedProducts } from '../utils/apiCalls';
import Card from '../common/Card';

const Product = (props) => {
    const [product, setProduct] = useState({ name: '', description: '' });
    const [related, setRelated] = useState([]);
    const [error, setError] = useState('');
    const loadProduct = prodId => {
        getOneProduct(prodId).then(resp => {
            if (resp.error) {
                setError(error);
            } else {
                setProduct(resp);
                getRelatedProducts(resp._id).then(item => {
                    if (item.error) setError(item.error);
                    else setRelated(item);
                })
            }
        })
    }
    useEffect(() => {
        const prodId = props.match.params.productId;
        prodId && loadProduct(prodId);
    }, [props])
    return (
        <Layout title={product.name} description={product.description.substring(0, 100)} className='container-fluid'>
            <h4 className="mb-4">Single product</h4>
            <div className="row">
                <div className="col-8">
                    <Card product={product} viewProductBtn={false} />
                </div>
                <div className="col-4">
                    <h4>Related products</h4>
                    {related && related.map((prod, index) => (
                        <div key={index} className="mb-3">
                            <Card product={prod} />
                        </div>
                    ))}
                </div>

            </div>
        </Layout>
    )
}



export default Product;