import React from 'react';
import { isAuthenticated } from '../utils/auth';
import { Link } from 'react-router-dom';

const Checkout = ({ products }) => {

    const getTotal = () => products.reduce((current, next) => {
        return current + next.count * next.price;
    }, 0);

    const showCheckout = () => {
        if (isAuthenticated()) return <button className="btn-success">Checkout</button>
        return <Link to='/login'><button className="btn-primary">Login to checkout</button></Link>
    }

    return (
        <div>
            <h2>Total: &#8377;{getTotal()}</h2>
            {showCheckout()}
        </div>
    )
}

export default Checkout;