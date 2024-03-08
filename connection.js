const mongoose = require('mongoose');

// Connect to mongo
const connectToMongo = async (url) => {
    return mongoose.connect(url);
};

// Exporting the connection
module.exports = {
    connectToMongo,
};