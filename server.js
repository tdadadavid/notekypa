const config = require('./config');
const { connectToDatabase } = require('./database');
const router = require('./components');

const express = require('express');
const server = express();
server.use(express.json());

server.use(router);

server.use((req, res, next) => {
    next(new Error(`Cannot handle request ${req.url}`));
});

server.use((err, req, res, next) =>{
    res.status(400).json({
        status: 400,
        message: err.toString(),
    });
});

connectToDatabase();

server.listen(config.PORT, () => { console.log(`Server running at ${config.PORT}`); });
