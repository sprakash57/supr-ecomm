const Validator = require('validator');
const { isEmpty } = require('../utils/index');

exports.validateRegistration = (data) => {
    let errors = {};
    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.password2 = isEmpty(data.password2) ? '' : data.password2;
    Validator.isLength(data.name, { min: 2, max: 30 }) || (errors.name = 'Name must be between 2 and 30 characters');
    Validator.isEmpty(data.name) && (errors.name = 'Name field is requried');
    Validator.isEmpty(data.email) && (errors.email = 'Email field is requried');
    Validator.isEmail(data.email) || (errors.email = 'Email is invalid');
    Validator.isEmpty(data.password) && (errors.password = 'Password is required');
    Validator.isLength(data.password, { min: 6, max: 32 }) || (errors.password = 'Password must be between 6 to 32 characters');
    Validator.isEmpty(data.password2) && (errors.password2 = 'Confirm Password is required');
    Validator.equals(data.password, data.password2) || (errors.password2 = 'Passwords must match');
    return { errors, isValid: isEmpty(errors) }
}

exports.validateLogin = (data) => {
    const errors = {};
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    Validator.isEmpty(data.email) && (errors.email = 'Email field is required');
    Validator.isEmail(data.email) || (errors.email = 'Invalid email format');
    Validator.isEmpty(data.password) && (errors.password = 'Password can not be empty');
    return { errors, isValid: isEmpty(errors) }
}