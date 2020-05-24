import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import { Link } from 'react-router-dom';
import { getBrainTreeClientToken, processPayment, createOrder } from '../utils/apiCalls';
import DropIn from 'braintree-web-drop-in-react';

const ShowAlert = ({ error, success }) => {
    if (error) return <div className="alert alert-danger">{error}</div>
    else if (success) return <div className="alert alert-success">Payment successful!!</div>
    return null;
}

const Loader = ({ loading }) => {
    if (loading) return <h2>Loading...</h2>
    return null;
}

const Checkout = ({ products, onRemoveItem }) => {
    const [data, setData] = useState({
        success: false,
        loading: false,
        clientToken: null,
        error: '',
        instace: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (id, token) => {
        getBrainTreeClientToken(id, token).then(resp => {
            if (resp.error) setData({ ...data, error: resp.error });
            else setData({ ...data, clientToken: resp.clientToken });
        })
    }

    const getTotal = () => {
        return products.reduce((current, next) => {
            return current + next.count * next.price;
        }, 0)
    }

    const showCheckout = () => {
        if (isAuthenticated()) return <div>{showDropIn()}</div>
        return <Link to='/login'><button className="btn-primary">Login to checkout</button></Link>
    }

    const handleAddress = e => {
        setData({ ...data, address: e.target.value });
    }

    const payAmount = () => {
        setData({ ...data, loading: true });
        //send nonce to the server. nonce = data.instance.requestPaymentMethod()
        let getNonce = data.instace.requestPaymentMethod().then(resp => {
            const paymentData = {
                paymentMethodNonce: resp.nonce,
                amount: getTotal(products)
            };
            processPayment(userId, token, paymentData).then(payResp => {
                const orderData = {
                    products,
                    transaction_id: payResp.transaction.id,
                    amount: parseInt(payResp.transaction.amount),
                    address: data.address
                }
                createOrder(userId, token, orderData)
                    .then(order => {
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('cart');
                            onRemoveItem();
                            setData({ ...data, success: true, loading: false });
                        }
                    })
                    .catch(error => {
                        console.log('Create order error: ', error);
                        setData({ ...data, loading: false });
                    });

            }).catch(error => {
                console.log('Payment error: ', error);
                setData({ ...data, loading: false });
            })
        }).catch(err => {
            console.log('Drop in:', err);
            setData({ ...data, error: err.message })
        })
    }

    useEffect(() => {
        getToken(userId, token);
    }, [])

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            value={data.address}
                            placeholder='Type delivery address'
                            className="form-control" />
                    </div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instace => data.instace = instace}
                    />
                    <button className="btn btn-success btn-block" onClick={payAmount}>Pay</button>
                </div>
            ) : null}
        </div>
    )

    return (
        <div>
            <ShowAlert error={data.error} success={data.success} />
            <Loader loading={data.loading} />
            <h2>Total: &#8377;{getTotal()}</h2>
            {showCheckout()}
        </div>
    )
}

export default Checkout;