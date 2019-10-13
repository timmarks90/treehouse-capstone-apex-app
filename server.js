const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load Env config
dotenv.config({
    path: './config.env'
});

const app = express();

// Dev logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Single Page App
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

// Profile routes
app.use('/api/v1/profile', require('./routes/profile'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});