import { Request, Response, NextFunction } from "express";

/**
 * Global error-handling middleware
 */
const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error Middleware:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  // Handle known error types
  if (err instanceof Error) {
    message = err.message;
    if ((err as any).status) {
      statusCode = (err as any).status;
    }
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });

  next(); // Ensure Express continues processing
};

export default errorMiddleware;
