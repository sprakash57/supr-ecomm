const jwt = require('jsonwebtoken'); //Generate signed token
const expressJwt = require('express-jwt'); //For authorization check
const User = require('../models/user');
const { errorHandler } = require('../utils/dbErrorHandler');
const { validateRegistration, validateLogin } = require('../utils/dataValidator');

exports.register = (req, res) => {
    const { errors, isValid } = validateRegistration(req.body);
    if (!isValid) return res.status(400).json({ errors });
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) return res.status(400).json({ err: errorHandler(err) });
        res.json({ id: user._id, name: user.name, email: user.email });
    })
}

exports.login = (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) return res.status(400).json({ message: '', errors });
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) return res.status(404).json({ message: 'User not found', errors: '' })
        if (!user.authenticate(req.body.password)) return res.status(401).json({ message: 'User not authorized', errors: '' })
        //Authenticate if user is found
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        res.cookie('token', token, { expire: new Date() + 9999 });
        //return response to user with token
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } })
    })
}

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'logged out successfully' });
}

exports.requireLogin = expressJwt({
    secret: process.env.JWT_KEY,
    userProperty: 'auth'
})

exports.isAuthUser = (req, res, next) => {
    const user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) return res.status(403).json({ error: 'Accees denied' });
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ error: 'Admin resource! Access denied' });
    }
    next();
}
