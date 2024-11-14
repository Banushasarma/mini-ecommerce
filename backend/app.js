const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const products = require('./routes/product');
const orders = require('./routes/order');
const connectDatabase = require('./config/connectDatabase');




// Middleware to serve static files
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Connect to MongoDB
connectDatabase();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Routes
app.use('/api/v1/', products);
app.use('/api/v1/', orders);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist', 'frontend', 'browser')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'frontend', 'browser', 'index.html'));
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})