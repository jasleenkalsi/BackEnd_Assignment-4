import { Request, Response } from "express";
import admin from "../config/firebase";

// Get user details
export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        const user = await admin.auth().getUser(uid);

        return res.status(200).json({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: user.customClaims?.role || "user", // Default to "user" if no role assigned
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user details", error });
    }
};
