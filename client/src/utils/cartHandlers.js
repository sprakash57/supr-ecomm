export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({ ...item, count: 1 });
        //Set can store array having duplicate objects. This is how you should remove duplicate objects from 
        //an array.
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id)
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}

export const updateItems = (id, count) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.getItem('cart'));
        cart.map((prod, i) => {
            if (prod._id === id) {
                cart[i].count = parseInt(count);
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const removeItem = id => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            cart.map((prod, i) => {
                if (prod._id === id) cart.splice(i, 1)
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const totalItems = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;
}

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) return JSON.parse(localStorage.getItem('cart'));
    }
    return [];
}

export const emptyCart = next => {
    if (typeof winodow !== "undefined") {
        localStorage.removeItem('cart');
        next();
    }
}