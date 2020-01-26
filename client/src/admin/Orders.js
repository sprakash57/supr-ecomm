import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { isAuthenticated } from '../utils/auth'
import { listOrders, getStatus } from '../utils/apiCalls'
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([]);
    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log('NOt able to load orders', data.error);
            } else {
                setOrders(data);
            }
        })
    }

    const loadStatus = () => {
        getStatus(user._id, token).then(data => {
            if (data.error) console.log('Not able to load the status', data.error);
            else setStatus(data);
        })
    }

    const handleStatusChange = id => e => {
        console.log('update status', e.target.value, id);
    }

    useEffect(() => {
        loadOrders();
        loadStatus();
    }, [])

    const ordersCount = () => {
        if (orders.length > 0) return <h1 className="display-2">Total orders: {orders.length}</h1>
        return <h1 className="text-danger">No orders!!</h1>
    }

    const showProductInfo = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    )

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={handleStatusChange(o._id)}>
                <option>Update Status</option>
                {status.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
        </div>
    )

    return (
        <Layout title='Orders' description={`Good day ${user.name}. You can manage all orders here`} className='container-fluid'>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {ordersCount()}
                    {orders.map((order, oIndex) => (
                        <div key={oIndex} className="mt-5" style={{ borderBottom: '5px solid indigo' }}>
                            <h2 className="mb-5">
                                <span className="bg-primary">Order id: {order._id}</span>
                            </h2>
                            <ul className="list-group mb-2">
                                <li className="list-group-item">Status: {showStatus(order)}</li>
                                <li className="list-group-item">Transaction id: {order.transaction_id}</li>
                                <li className="list-group-item">Total amount: &#8377; {order.amount}</li>
                                <li className="list-group-item">Ordered by: {order.user.name}</li>
                                <li className="list-group-item">Placed on: {moment(order.createdAt).fromNow()}</li>
                                <li className="list-group-item">Delivery Address: {order.address}</li>
                            </ul>
                            <h3 className="mt-4 mb-4 font-italic">
                                Total products in order: {order.products.length}
                            </h3>
                            {order.products.map((p, pIndex) => (
                                <div className="mb-4" key={pIndex} style={{ padding: '20px', border: '1px solid indigo' }}>
                                    {showProductInfo('Product', p.name)}
                                    {showProductInfo('Price', p.price)}
                                    {showProductInfo('Quantity', p.count)}
                                    {showProductInfo('Product id', p._id)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Orders