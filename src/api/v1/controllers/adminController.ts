import { Request, Response } from "express";
import admin from "../../../../config/firebase";

export const setUserRole = async (req: Request, res: Response) => {
    try {
        const { userId, role } = req.body;

        if (!userId || !role) {
            return res.status(400).json({ error: "User ID and role are required." });
        }

        await admin.auth().setCustomUserClaims(userId, { role });

        res.status(200).json({ message: `Role ${role} assigned to user ${userId}` });
    } catch (error) {
        console.error("❌ Role Assignment Error:", error);
        res.status(500).json({ error: "Failed to assign role." });
    }
};
