import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { getProducts } from '../utils/apiCalls';
import Card from '../common/Card';
import Search from '../common/Search';

const ShowAlert = ({ error }) => {
    if (error.size === 0 && error.msg !== '') return <div className="alert alert-danger text-center">{error.msg}</div>
    else if (error.size) return <div className="alert alert-success text-center">{error.size} result(s) found</div>
    return <></>
}

const Home = () => {
    const [prodBySell, setProdBySell] = useState([]);
    const [prodByArrival, setProdByArrival] = useState([]);
    const [error, setError] = useState({ msg: '', size: 0 });

    const loadProdBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) setError({ ...error, msg: data.error });
            else setProdBySell(data)
        }).catch(err => setError({ ...error, msg: "INTERNAL SERVER ERROR" }))
    }

    const loadProdByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) setError({ ...error, msg: data.error });
            else setProdByArrival(data)
        }).catch(err => setError({ ...error, msg: "INTERNAL SERVER ERROR" }))
    }

    const showAlert = (msg, size = 0) => {
        setError({ ...error, msg, size });
    }

    useEffect(() => {
        loadProdBySell();
        loadProdByArrival();
    }, [])
    return (
        <Layout title='SUPR eComm' description='Here you will find all the products available' className='container-fluid'>
            <ShowAlert error={error} />
            <Search handleAlert={showAlert} />
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {prodBySell.map((item, index) => (
                    <div key={index} className="col-4 mb-3">
                        <Card product={item} />
                    </div>
                ))}
            </div>
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {prodByArrival.map((item, index) => (
                    <div key={index} className="col-4 mb-3">
                        <Card product={item} />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Home;