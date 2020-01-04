import React, { useState } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = cat => () => {
        const currentCategoryId = checked.indexOf(cat);
        const newCheckedCategoryId = [...checked];
        if (currentCategoryId === -1) newCheckedCategoryId.push(cat);
        else newCheckedCategoryId.splice(currentCategoryId, 1);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((cat, index) => (
        <li key={index} className="list-unstyled">
            <input
                onChange={handleToggle(cat._id)}
                type="checkbox"
                className="form-check-input"
                id='name'
                value={checked.indexOf(cat._id === -1)} />
            <label htmlFor="name" className="form-check-label">{cat.name}</label>
        </li>
    ))
}

export default Checkbox;