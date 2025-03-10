// errorHandler.ts
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("🔥 Error: ", err.message);
    
    if (!res.headersSent) {
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export default errorHandler;