function successResponse(res, status, message, data){
    res.status(status).json({
        status,
        message,
        data
    });
}

function successMessage(res, status, message){
    res.status(status).json({
        status,
        message
    });
}

function errorResponse(res, status, message){
    res.status(status).json({
        status,
        message
    });
}


module.exports = {
    errorResponse,
    successResponse,
    successMessage
}