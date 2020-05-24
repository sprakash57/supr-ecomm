import React, { useState, useEffect } from 'react';
import { getCategories, searchList } from '../utils/apiCalls';
import Card from './Card';

const Search = ({ handleAlert }) => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: []
    });

    const { categories, category, search, results } = data

    const loadCategories = () => {
        getCategories().then(resp => {
            if (resp.error) handleAlert(resp.error);
            else {
                setData({ ...data, categories: resp });
                handleAlert('');
            }
        }).catch(err => alert('Something is wrong on server side'))
    }

    const searchData = () => {
        if (search) {
            searchList({ search: search || undefined, category })
                .then(resp => {
                    if (resp.error) {
                        handleAlert(resp.error);
                        setData({ ...data, results: [] })
                    }
                    else {
                        setData({ ...data, results: resp });
                        handleAlert('', resp.length);
                    }
                })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        searchData();
    }

    const handleChange = name => e => {
        handleAlert('');
        setData({ ...data, [name]: e.target.value });
    }

    const searchForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select onChange={handleChange('category')} className="btn mr-2">
                                <option value="All">All</option>
                                {categories && categories.map((c, i) => <option key={i} value={c._id}>{c.name}</option>)}
                            </select>
                        </div>
                        <input
                            type="search"
                            className='form-control'
                            onChange={handleChange('search')}
                            placeholder='search by name'
                        />
                    </div>
                    <div className="btn inpu-group-append" style={{ border: 'none' }}>
                        <button className="input-group-text">Search</button>
                    </div>
                </span>
            </form>
        )
    }

    const searchedProduct = (results = []) => (
        <div className="row">
            {results.map((p, i) => <Card key={i} product={p} />)}
        </div>
    )

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <div className='row mb-3'>
            <div className="container">{searchForm()}</div>
            <div className="container-fluid">
                {searchedProduct(results)}
            </div>
        </div>
    )
}

export default Search;