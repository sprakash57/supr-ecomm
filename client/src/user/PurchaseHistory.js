import React from 'react';
import moment from 'moment';

const PurchaseHistory = ({ history }) => (
    <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
            <li className="list-group-item">
                {history.map((h, hIndex) => {
                    return (
                        <div key={hIndex}>
                            <hr />
                            {h.products.map((p, pIndex) => {
                                return (
                                    <div key={pIndex}>
                                        <h6>Product name: {p.name}</h6>
                                        <h6>Product price: &#8377;{p.price}</h6>
                                        <h6>
                                            Purchased date:{" "}
                                            {moment(p.createdAt).fromNow()}
                                        </h6>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </li>
        </ul>
    </div>
);

export default PurchaseHistory;
