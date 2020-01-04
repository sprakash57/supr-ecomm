import React, { useState, useEffect } from 'react';
import { getCart } from '../utils/cartHandlers';
import Layout from '../common/Layout';
import Card from '../common/Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [removed, setRemoved] = useState(false);

    const onRemoveItem = () => {
        setRemoved(true)
    }

    useEffect(() => {
        setItems(getCart());
    }, [removed])

    return (
        <Layout title='Shopping cart' description='All your cart products are available here' className='container-fluid'>
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? (
                        <div>
                            <h2>Your cart has {items.length} items</h2>
                            <hr />
                            {items.map((prod, i) => (
                                <Card
                                    key={i}
                                    product={prod}
                                    addToCartBtn={false}
                                    modifyCart={true}
                                    onRemoveItem={onRemoveItem} />
                            ))}
                        </div>
                    ) : (
                            <h2>Your cart is empty. <Link to='/shop'>Go shopping</Link></h2>
                        )}
                </div>
                <div className="col-6">
                    <h2 className='mb-4'>Cart summary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart;