const { StatusCodes } = require('http-status-codes');
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message: message,
        error: err
    });
}
module.exports = errorMiddleware;