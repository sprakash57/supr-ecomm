import React from 'react';

const Loader = () => (
    <button className="btn btn-primary" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span className="sr-only">Loading...</span>
    </button>
)

export default Loader;