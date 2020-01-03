import React, { useState } from 'react';

const Radiobox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = e => {
        handleFilters(e.target.value);
        setValue(e.target.value);
    }

    return prices.map((price, index) => (
        <div key={index}>
            <input
                onChange={handleChange}
                type="radio"
                className="form-check-input"
                id='name'
                name={price}
                className='mr-2 ml-2'
                value={price._id} />
            <label htmlFor="name" className="form-check-label">{price.name}</label>
        </div>
    ))
}

export default Radiobox;