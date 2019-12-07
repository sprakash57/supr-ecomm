const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return bcryptjs.hash(req.body.password, 10);
            }
            const error = new Error();
            error.message = 'User already present!';
            throw error;
        })
        .then(hash => {
            const user = createUser(req.body.email, hash);
            return user.save();
        })
        .then(result => {
            return res.status(201).send({ message: "Successfully registered!" });
        })
        .catch(error => {
            next(error)
        })
}

exports.login = (req, res, next) => {
    let email = undefined, userId = undefined;
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) throw { message: 'Login failed' }
            email = user[0].email;
            userId = user[0]._id
            return bcryptjs.compare(req.body.password, user[0].password);
        })
        .then(result => {
            if (result) {
                const token = jwt.sign(
                    { email: email, userId: userId },
                    process.env.JWT_KEY,
                    { expiresIn: '1h' }
                );
                return res.status(200).json({ message: 'Login successful!', token });
            }
            const error = { message: 'Login failed' };
            throw error;
        })
        .catch(error => {
            next(error)
        })
}

exports.deleteUser = (req, res, next) => {
    const { userId } = req.params;
    User.remove({ _id: userId })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'User deleted successfully!' })
        })
        .catch(error => {
            error.message = 'Delete failed';
            next(error);
        })
}

const createUser = (email, hash) => {
    return new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: hash
    })
}
