import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from '../utils/apiCalls';
import Card from './Card';
import Search from './Search';

const ShowAlert = ({ error }) => {
    if (error) return <div className="alert alert-danger text-center">{error}</div>
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
        })
    }

    const loadProdByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) setError(data.error);
            else setProdByArrival(data)
        })
    }

    const showAlert = (msg, size = 0) => setError({ msg, size });

    useEffect(() => {
        loadProdBySell();
        loadProdByArrival();
    }, [])
    return (
        <Layout title='Home Page' description='Next-gen eComm' className='container-fluid'>
            <ShowAlert error={error} />
            <Search handleAlert={showAlert} />
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {prodBySell.map((item, index) => <Card key={index} product={item} />)}
            </div>
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {prodByArrival.map((item, index) => <Card key={index} product={item} />)}
            </div>
        </Layout>
    )
}



export default Home;