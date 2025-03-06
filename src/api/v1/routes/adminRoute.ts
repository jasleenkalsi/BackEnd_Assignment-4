import express from "express";
import { verifyAdmin } from "../middleware/authorization";
import { setUserRole } from "../controllers/adminController";
import { getUserDetails } from "../controllers/userController"; // ✅ Ensure correct import
 

const router = express.Router();

// ✅ Pass the controller functions directly
router.get("/user/:uid", getUserDetails);
router.post("/admin/set-role", verifyAdmin, setUserRole);


export default router;
