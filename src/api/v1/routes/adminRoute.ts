import express from "express";
import { verifyAdmin } from "../middleware/authorization";
import { getUserDetails } from "../controllers/userController"; // ✅ Ensure correct import
import { setUserRole } from "../controllers/adminController"; // ✅ Ensure correct import

const router = express.Router();

// ✅ Pass the controller functions directly
router.get("/user/:uid", getUserDetails);
router.post("/admin/set-role", setUserRole, verifyAdmin);

export default router;
