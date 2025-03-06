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
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized - Missing token" });
      return;
    }

    // ✅ Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // ✅ Attach user info to request object (Temporary Fix)
    (req as any).user = {  // 👈 Use "any" to temporarily bypass TypeScript error
      uid: decodedToken.uid,
      role: decodedToken.customClaims?.role || "user",
    };

    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
