import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItems, removeItem } from '../utils/cartHandlers';

const ShowStock = ({ quantity }) => {
    if (quantity > 0) {
        return <span className="badge-primary badge-pill">{quantity} available</span>
    }
    return <span className="badge-primary badge-pill">Out of stock</span>
}

const Card = ({ product, viewProductBtn = true, addToCartBtn = true, modifyCart = false, onRemoveItem }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const handleRemove = id => () => {
        removeItem(id);
        onRemoveItem && onRemoveItem();
    }

    const handleChange = id => e => {
        setCount(e.target.value < 1 ? 1 : e.target.value);
        if (e.target.value >= 1) updateItems(id, e.target.value);
    }

    const shouldRedirect = redirect => redirect && <Redirect to='/cart' />

    const showModifyCart = (modifyCart) => {
        if (modifyCart) {
            return (
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Update</span>
                    </div>
                    <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                </div>
            )
        }
        return <></>
    }

    return (
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
                <p className='black-10'>&#8377;{product.price}</p>
                <p className='black-9'>Category: {product.category && product.category.name}</p>
                <p className='black-8'>Added {moment(product.createdAt).fromNow()}</p>
                <ShowStock quantity={product.quantity} />
                <br />
                <Link to={`/product/${product._id}`}>
                    {viewProductBtn && <button className="btn btn-primary mt-2 mb-2 mr-2">View Product</button>}
                </Link>
                {addToCartBtn ? (
                    <button onClick={addToCart} className="btn btn-warning mt-2 mb-2 mr-2">Add to cart</button>
                ) : (
                        <button onClick={handleRemove(product._id)} className="btn btn-danger mt-2 mb-2">Remove</button>
                    )}
                {showModifyCart(modifyCart)}
            </div>
        </div>
    )
}

export default Card;