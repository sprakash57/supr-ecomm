require('dotenv').config();
const app = require('express')();
const logger = require('morgan');
const parsedBody = require('body-parser');
const parsedCookie = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const url = "mongodb://localhost:27017/ecomm";
const port = process.env.PORT || 8000;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('DB connection error: ', err))

//Middlewares
app.use(logger('dev'));
app.use(parsedBody.json());
app.use(parsedBody.urlencoded({ extended: true }));
app.use(parsedCookie());
app.use(cors());

//Routes
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/order', orderRoutes);

//Invalid token error handler
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'No authorization token was found' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})