import { Request, Response, NextFunction } from "express";
import admin from "../../../../config/firebase";

interface AuthenticatedRequest extends Request {
    user?: {
        uid: string;
        role: string;
    };
}

export const verifyAdmin = (allowedRoles: string[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ error: "Unauthorized - Missing token" });
                return;
            }

            // Check if user has the required role
            if (!allowedRoles.includes(req.user.role)) {
                res.status(403).json({ error: "Access denied - Insufficient permissions" });
                return;
            }

            next();
        } catch (error) {
            console.error("❌ Authorization Error:", error);
            res.status(403).json({ error: "Unauthorized: Invalid token." });
        }
    };
};
