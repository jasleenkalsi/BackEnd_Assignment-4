import { Request, Response, NextFunction } from "express";
import admin from "../../../../config/firebase";
import { AuthenticatedRequest } from "../../../types/express"; // ✅ Import extended Request type

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: No token provided." });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      role: decodedToken.customClaims?.role || "user",
    };

    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error);
    res.status(403).json({ error: "Unauthorized: Invalid or expired token." });
  }
};
