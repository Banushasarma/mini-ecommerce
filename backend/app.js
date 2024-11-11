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

// Routes
app.use('/api/v1/', products);
app.use('/api/v1/', orders);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})