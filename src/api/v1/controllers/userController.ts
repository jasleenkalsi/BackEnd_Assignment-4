import { Request, Response } from "express";
import admin from "../../../../config/firebase"; // ✅ Ensure correct import path

// ✅ Ensure function signature returns `Promise<void>` and modifies `res` directly
export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const uid = req.params.uid;

        // Fetch user details from Firebase Auth
        const user = await admin.auth().getUser(uid);

        // ✅ Modify `res` directly instead of returning a response
        res.status(200).json({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: user.customClaims?.role || "user",
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
};
