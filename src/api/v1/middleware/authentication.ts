import { Request, Response, NextFunction } from "express";
import admin from "../../../../config/firebase";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided." }); // ✅ No return
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next(); // ✅ Always call next() when successful
    } catch (error) {
        console.error("Authentication error:", error);
        next(error); // ✅ Pass error to Express error handler
    }
};
