import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { getCategories, getFilteredProducts } from '../utils/apiCalls';
import Checkbox from '../common/Checkbox';
import { prices } from '../utils/prices'
import Radiobox from '../common/Radiobox';
import Card from '../common/Card';
import Loader from '../common/Loader';

const ShowAlert = ({ error }) => {
    if (error) return <div className="alert alert-danger text-center">{error}</div>
    return <></>
}

const Shop = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadFilteredProducts = (skip, limit, filters) => {
        getFilteredProducts(skip, limit, filters).then(resp => {
            if (resp.error) setError(resp.error);
            else {
                setResult(resp.data);
                setSize(resp.size);
                setSkip(0);
            }
        })
    }

    const loadMoreProducts = () => {
        let toSkip = skip + limit;
        setLoading(true);
        getFilteredProducts(toSkip, limit, selectedFilters.filters).then(resp => {
            if (resp.error) {
                setError(resp.error);
            } else {
                setResult([...result, ...resp.data]);
                setSize(resp.size);
                setSkip(toSkip);
            }
            setLoading(false);
        })
    }

    const loadMoreBtn = (loading, size, limit) => {
        if (size > 0 && size >= limit) {
            if (loading) return <Loader />
            else return <button onClick={loadMoreProducts} className='btn btn-warning mb-5'>Load more</button>
        }
        return <></>
    }

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...selectedFilters };
        newFilters.filters[filterBy] = filters;
        if (filterBy === 'price') {
            let priceValue = handlePrice(filters);
            newFilters.filters[filterBy] = priceValue;
        }
        loadFilteredProducts(0, limit, selectedFilters.filters)
        setSelectedFilters(newFilters);
    }

    const handlePrice = value => {
        const fixedPrice = prices.find(price => price._id === parseInt(value));
        return fixedPrice ? fixedPrice.array : [];
    }

    useEffect(() => {
        getCategories().then(data => {
            if (data.error) setError(data.error)
            else setCategories(data);
        })
        loadFilteredProducts(skip, limit, selectedFilters.filters)
    }, [])

    return (
        <Layout title='Shop' description='Shopping section' className='container-fluid'>
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters => handleFilters(filters, 'category')}
                        />
                    </ul>
                    <h4>Select price range</h4>
                    <ul>
                        <Radiobox
                            prices={prices}
                            handleFilters={filters => handleFilters(filters, 'price')}
                        />
                    </ul>
                </div>
                <div className="col-8">
                    <ShowAlert error={error} />
                    <h4 className='mb-4'>Products</h4>
                    <div className="row">
                        {result && result.map((item, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={item} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreBtn(loading, size, limit)}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;