import { Request, Response, NextFunction } from "express";
import admin from "../../../../config/firebase";

/**
 * Middleware to authenticate users using Firebase ID token.
 */
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: No token provided." });
      return; // ✅ Explicitly return to avoid the void issue
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // ✅ Attach user info to request object
    (req as any).user = {
      uid: decodedToken.uid,
      role: decodedToken.customClaims?.role || "user",
    };

    return next(); // ✅ Ensure correct function return
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(403).json({ error: "Unauthorized: Invalid or expired token." });
    return; // ✅ Explicitly return to avoid TypeScript issue
  }
};
