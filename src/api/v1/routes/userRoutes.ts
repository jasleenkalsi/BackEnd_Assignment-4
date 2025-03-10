// routes/authRoutes.ts
import express from "express";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

router.get("/protected-route", authenticateUser, (req, res) => {
    res.status(200).json({ message: "Access granted." });
});

export default router;