import queryString from 'query-string';

export const createCategory = (userId, token, category) => {
    return fetch(`/api/category/create/${userId}`, {
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
    return fetch(`/api/categories`)
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const getProducts = (sortBy) => {
    return fetch(`/api/products?sortBy=${sortBy}&order=desc&limit=6`)
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = { skip, limit, filters };
    return fetch(`/api/products/by/search`, {
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
    return fetch(`/api/products/related/${prodId}`)
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const searchList = params => {
    const query = queryString.stringify(params);
    return fetch(`/api/products/search?${query}`)
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const getBrainTreeClientToken = (userId, token) => {
    return fetch(`/api/payment/getToken/${userId}`, {
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
    return fetch(`/api/payment/process/${userId}`, {
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
    return fetch(`/api/order/create/${userId}`, {
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
    return fetch(`/api/order/list/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(resp => resp.json()).catch(err => console.log(err));
}

export const getStatus = (userId, token) => {
    return fetch(`/api/order/status/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(resp => resp.json()).catch(err => console.log(err));
}

export const updateStatus = (userId, token, orderId, status) => {
    return fetch(`/api/order/${orderId}/status/${userId}`, {
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
    return fetch(`/api/user/${userId}`, {
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
    return fetch(`/api/user/${userId}`, {
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
    return fetch(`/api/orders/by/user/${userId}`, {
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
    return fetch(`/api/products`)
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

export const getOneProduct = productId => {
    return fetch(`/api/product/${productId}`)
        .then(resp => resp.json())
        .catch(err => console.log(err));
}

export const createProduct = (userId, token, product) => {
    return fetch(`/api/product/create/${userId}`, {
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
    return fetch(`/api/product/${prodId}/${userId}`, {
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
    return fetch(`/api/product/${prodId}/${userId}`, {
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
