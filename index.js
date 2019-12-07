require('dotenv').config();
const app = require('express')();
const logger = require('morgan');
const parsedBody = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const url = "mongodb://localhost:27017/ecomm";
const port = process.env.PORT || 3000;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));
db.on("error", console.error.bind(console, "MongoDB connection error: "));

app.use(logger('dev'));
app.use(parsedBody.json());
app.use(parsedBody.urlencoded({ extended: true }));
//Setting CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
// Handle Error Requests
app.use((req, res, next) => {
    const error = { message: 'Not Found', status: 404 };
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})