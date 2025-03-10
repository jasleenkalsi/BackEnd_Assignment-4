import express from "express";
import { authenticateUser } from "../middleware/authentication"; 
import { verifyAdmin } from "../middleware/authorization"; 
import { createLoan, reviewLoans, approveLoan } from "../controllers/loanController";

const router = express.Router();

/**
 * Utility function to handle async route handlers
 * Ensures errors are passed to Express error middleware
 */
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * @route POST /api/v1/loans/create
 * @desc Create a new loan application
 * @access Authenticated Users
 */
router.post("/create", authenticateUser, asyncHandler(createLoan));

/**
 * @route GET /api/v1/loans/review
 * @desc Get all pending loan applications
 * @access Officers & Admins only
 */
router.get("/review", authenticateUser, verifyAdmin(["officer", "admin"]), asyncHandler(reviewLoans));

/**
 * @route POST /api/v1/loans/approve
 * @desc Approve a loan application
 * @access Admins only
 */
router.post("/approve", authenticateUser, verifyAdmin(["admin"]), asyncHandler(approveLoan));

export default router;
