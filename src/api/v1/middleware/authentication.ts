import { Request, Response, NextFunction } from "express";
import admin from "../../../../config/firebase";

/**
 * Middleware to authenticate users using Firebase ID token.
 */
export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      res.status(401).json({ error: "Unauthorized - Missing token" });
      return;
    }

    // ✅ Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // ✅ Attach user info to request object
    req.user = {
      uid: decodedToken.uid,
      role: decodedToken.customClaims?.role || "user", // Default role is "user"
    };

    next(); // ✅ Proceed to the next middleware/controller
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
