import { Request, Response, NextFunction } from "express";
import admin from "../../../../config/firebase";

// Extend Request type to include user information
interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    role: string;
  };
}

// ✅ Ensure verifyAdmin returns a middleware function
export const verifyAdmin = (allowedRoles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ error: "Unauthorized - Missing token" });
        return;
      }

      // Decode the token
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Attach user to request for future use
      req.user = {
        uid: decodedToken.uid,
        role: decodedToken.customClaims?.role || "user", // Default role if missing
      };

      // Check if user has the required role
      if (!allowedRoles.includes(req.user.role)) {
        res.status(403).json({ error: "Access denied - Insufficient permissions" });
        return;
      }

      next(); // ✅ Proceed if user has the required role
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Invalid or expired token";
      res.status(403).json({ error: errorMessage });
      return; // ✅ Ensure the function exits properly
    }
  };
};
