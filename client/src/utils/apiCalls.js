import { API } from '../config';
import queryString from 'query-string';

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const getCategories = () => {
    return fetch(`${API}/categories`)
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = { skip, limit, filters };
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const getRelatedProducts = prodId => {
    return fetch(`${API}/products/related/${prodId}`)
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const searchList = params => {
    const query = queryString.stringify(params);
    return fetch(`${API}/products/search?${query}`)
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const getBrainTreeClientToken = (userId, token) => {
    return fetch(`${API}/payment/getToken/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/payment/process/${userId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ order: orderData })
    })
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(resp => resp.json()).catch(err => console.log(err));
}

export const getStatus = (userId, token) => {
    return fetch(`${API}/order/status/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(resp => resp.json()).catch(err => console.log(err));
}

export const updateStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(resp => resp.json())
        .catch(error => console.log(error))
}

export const readUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

export const updateUser = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const upateUserLocalInfo = (user, next) => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth))
            next();
        }
    }
}

export const getPurchaseHistory = (userId, token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

//Admin methods for product CRUD operation

export const getAllProducts = () => {
    return fetch(`${API}/products`)
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const getOneProduct = productId => {
    return fetch(`${API}/product/${productId}`)
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const deleteProduct = (prodId, userId, token) => {
    return fetch(`${API}/product/${prodId}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const updateProduct = (prodId, userId, token, product) => {
    return fetch(`${API}/product/${prodId}/${userId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: product
    })
        .then(resp => resp.json())
        .catch(err => console.log(err))
}
