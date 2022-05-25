const router = require('./components');

const express = require('express');
const app = express();
app.use(express.json());

app.use(router);

app.use((req, res, next) => {
    next(new Error(`Cannot handle request ${req.url}`));
});

app.use((err, req, res, next) =>{
    res.status(400).json({
        status: 400,
        message: err.toString(),
    });
});


module.exports = app;