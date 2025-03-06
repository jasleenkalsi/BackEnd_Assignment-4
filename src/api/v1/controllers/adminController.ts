import { Request, Response } from "express";
import admin from "../../../../config/firebase"; // ✅ Ensure correct import

/**
 * Assign a role to a user (Admin only)
 */
export const setUserRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uid, role } = req.body;

        // ✅ Validate input
        if (!uid || !role) {
            res.status(400).json({ error: "UID and role are required" });
            return;
        }

        // ✅ Validate role
        const validRoles = ["admin", "user", "loan_officer"];
        if (!validRoles.includes(role)) {
            res.status(400).json({ error: "Invalid role provided" });
            return;
        }

        // ✅ Assign role to the user
        await admin.auth().setCustomUserClaims(uid, { role });

        res.status(200).json({ message: `Role '${role}' assigned to user ${uid}` });
    } catch (error: unknown) {  // ✅ Explicitly type error as unknown
        if (error instanceof Error) {
            res.status(500).json({ error: "Failed to set role", details: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
