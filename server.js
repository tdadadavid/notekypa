const config = require('./config/config');
const router = require('./router/routes');
const { errorResponse } = require('./utils/ApiResponse');

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

server.listen(config.PORT, () => { console.log(`Server running at ${config.PORT}`); });
