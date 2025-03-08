"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Global error-handling middleware
 */
const errorMiddleware = (err, req, res, next) => {
    console.error("Error Middleware:", err);
    let statusCode = 500;
    let message = "Internal Server Error";
    // Handle known error types
    if (err instanceof Error) {
        message = err.message;
        if (err.status) {
            statusCode = err.status;
        }
    }
    res.status(statusCode).json({
        success: false,
        error: message,
    });
    next(); // Ensure Express continues processing
};
exports.default = errorMiddleware;
