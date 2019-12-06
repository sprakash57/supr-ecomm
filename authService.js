const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization) {

            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY)
                req.userData = decodedToken;
                next();
            } else {
                handleError(null, next);
            }
        } else {
            handleError(null, next);
        }
    } catch (error) {
        handleError(error, next);
    }
}

const handleError = (errLogged, next) => {
    const error = errLogged || { message: 'Auth failed' };
    next(error);
}