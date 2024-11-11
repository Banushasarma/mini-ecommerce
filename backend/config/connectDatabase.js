const mongoose = require("mongoose");

const connectDatabase = () => {
    // Connect to MongoDB database
    mongoose.connect(process.env.DB_URL)
        .then((con) => console.log('Connected to MongoDB host: ' + con.connection.host))
        .catch((err) => console.error('Failed to connect to MongoDB', err));
}

module.exports = connectDatabase;