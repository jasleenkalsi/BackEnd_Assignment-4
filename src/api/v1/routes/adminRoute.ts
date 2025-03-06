import express from "express";
import { authenticateUser } from "../middleware/authentication"; // ✅ Import authenticateUser
import { verifyAdmin } from "../middleware/authorization"; // ✅ Import verifyAdmin
import { setUserRole } from "../controllers/adminController";
import { getUserDetails } from "../controllers/userController";

const router = express.Router();

// ✅ Secure user details route (only authenticated users can access)
router.get("/user/:uid", authenticateUser, getUserDetails);

// ✅ Secure role assignment (authentication + admin verification required)
router.post("/admin/set-role", authenticateUser, verifyAdmin, setUserRole);

export default router;
