import express from "express";
import { getUserDetails } from "../controllers/userController";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

// ✅ Only authenticated users can access this route
router.get("/user/:uid", authenticateUser, getUserDetails);

export default router;
