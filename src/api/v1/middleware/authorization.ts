import { Request, Response, NextFunction } from "express";
import { auth } from "config/firebase";

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized - Missing token" });
      return; // ❌ FIX: Ensure no further execution
    }

    // Decode the token
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user has admin role
    if (decodedToken.role !== "admin") {
      res.status(403).json({ error: "Access denied - Admins only" });
      return; // ❌ FIX: Ensure no further execution
    }

    next(); // ✅ FIX: Properly calling next() instead of returning a response
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

