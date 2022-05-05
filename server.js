const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const shortenRoute = require('./routes/shortenRoute');

require('dotenv').config();

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const app = express();

const origins = process.env.ORIGIN;

const whitelist = origins.split(',');
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({ msg: 'success' });
});

app.use('/shorten', shortenRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
