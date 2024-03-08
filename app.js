require('dotenv').config();

const express = require('express');
const path = require('path');
const { connectToMongo } = require('./connection');
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/static');


// Create express app
const app = express();

// const port = 3000;
const port = process.env.PORT || 3000;

// Connect to mongo
connectToMongo(process.env.MONGO_URL)
    .then(() => console.log('Connected to mongo'))
    .catch(err => console.log('error connecting to mongo', err));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route
app.use('/', staticRouter);
app.use('/url', urlRouter);

// App listening on port 3000!
app.listen(port, () => console.log(`App listening on port localhost:${port}/`));