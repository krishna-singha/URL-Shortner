const mongoose = require('mongoose');

// Creating a schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamps: {type: Number} }],
},{timestamps: true},);

// Creating a model
const Url = mongoose.model('Url', urlSchema);

// Exporting the model
module.exports = Url;