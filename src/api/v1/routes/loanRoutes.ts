import express from "express";
import { authenticateUser } from "../middleware/authentication"; 
import { verifyAdmin } from "../middleware/authorization"; 
import { createLoan, reviewLoans, approveLoan } from "../controllers/loanController";

const router = express.Router();

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/create", authenticateUser, asyncHandler(createLoan));
router.get("/review", authenticateUser, verifyAdmin(["officer", "admin"]), asyncHandler(reviewLoans));
router.post("/approve", authenticateUser, verifyAdmin(["admin"]), asyncHandler(approveLoan));

export default router;
