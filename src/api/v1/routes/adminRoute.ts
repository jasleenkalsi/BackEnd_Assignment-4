// routes/adminRoutes.ts
import express from "express";
import { authenticateUser } from "../middleware/authentication";
import { verifyAdmin } from "../middleware/authorization";
import { setUserRole } from "../controllers/adminController";
import { getUserDetails } from "../controllers/userController";

const router = express.Router();

// Utility to handle async route errors
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * @route GET /api/v1/admin/user/:uid
 * @desc Retrieve user details
 * @access Authenticated Users Only
 */
router.get("/user/:uid", authenticateUser, asyncHandler(getUserDetails));

/**
 * @route POST /api/v1/admin/set-role
 * @desc Assign roles to users
 * @access Admins Only
 */
router.post("/set-role", authenticateUser, verifyAdmin(["admin"]), asyncHandler(setUserRole));

export default router;