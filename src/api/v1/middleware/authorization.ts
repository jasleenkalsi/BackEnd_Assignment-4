import { Request, Response, NextFunction } from "express";
import admin from "../../../../config/firebase";

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized - Missing token" });
      return;
    }

    // Decode the token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if user has admin role
    if (decodedToken.customClaims?.role !== "admin") {
      res.status(403).json({ error: "Access denied - Admins only" });
      return;
    }

    next(); // ✅ Proceed if user is admin
  } catch (error: unknown) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
