import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebase";

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - Missing token" });
        }

        const decodedToken = await auth.verifyIdToken(token);
        if (decodedToken.role !== "admin") {
            return res.status(403).json({ error: "Access denied - Admins only" });
        }

        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
};
