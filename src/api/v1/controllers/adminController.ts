import { Request, Response } from "express";
import admin from "config/firebase";

// Set custom claims (roles)
export const setUserRole = async (req: Request, res: Response) => {
    try {
        const { uid, role } = req.body; // role: "admin" or "user"

        await admin.auth().setCustomUserClaims(uid, { role });

        return res.status(200).json({ message: `Role '${role}' assigned to user ${uid}` });
    } catch (error) {
        return res.status(500).json({ message: "Error setting user role", error });
    }
};
