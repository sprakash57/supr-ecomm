import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import { Link } from 'react-router-dom';
import { getBrainTreeClientToken } from '../utils/apiCalls';
import DropIn from 'braintree-web-drop-in-react';

const ShowAlert = ({ error }) => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
)

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        success: false,
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

    const payAmount = () => {
        //send nonce to the server. nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instace.requestPaymentMethod().then(resp => {
            console.log(resp);
            nonce = resp.nonce;
            console.log('send nounce and total to process', nonce, getTotal())
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
                    <DropIn
                        options={{ authorization: data.clientToken }}
                        onInstance={instace => data.instace = instace}
                    />
                    <button className="btn btn-success" onClick={payAmount}>Pay</button>
                </div>
            ) : null}
        </div>
    )

    return (
        <div>
            <ShowAlert error={data.error} />
            <h2>Total: &#8377;{getTotal()}</h2>
            {showCheckout()}
        </div>
    )
}

export default Checkout;