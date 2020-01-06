require('dotenv').config();
const braintree = require('braintree');
const User = require('../models/user');

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});


exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, (err, resp) => {
        if (err) res.status(500).send(err);
        else res.send(resp);
    })
}