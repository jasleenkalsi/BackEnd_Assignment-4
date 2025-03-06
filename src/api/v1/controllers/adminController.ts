import { Request, Response } from "express";
import admin from "../../../../config/firebase"; // ✅ Ensure correct import path

export const setUserRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uid, role } = req.body;

        if (!uid || !role) {
            res.status(400).json({ message: "UID and role are required" });
            return;
        }

        await admin.auth().setCustomUserClaims(uid, { role });

        // ✅ Ensure `res` is modified directly
        res.status(200).json({ message: `Role '${role}' assigned to user ${uid}` });
    } catch (error) {
        res.status(500).json({ message: "Error setting user role", error });
    }
};
