import express from "express";
import { authenticateUser } from "../middleware/authentication"; // ✅ Import authenticateUser
import { verifyAdmin } from "../middleware/authorization"; // ✅ Import verifyAdmin
import { setUserRole } from "../controllers/adminController";
import { getUserDetails } from "../controllers/userController";

const router = express.Router();

/**
 * @route GET /api/v1/admin/user/:uid
 * @desc Retrieve user details
 * @access Authenticated Users Only
 */
router.get("/user/:uid", authenticateUser, getUserDetails);

/**
 * @route POST /api/v1/admin/set-role
 * @desc Assign roles to users
 * @access Admins Only
 */
router.post("/set-role", authenticateUser, verifyAdmin, setUserRole);

export default router;
