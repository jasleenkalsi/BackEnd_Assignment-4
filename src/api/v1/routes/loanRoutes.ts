
import express from "express";
import { authenticateUser } from "../middleware/authentication"; // ✅ Import authenticateUser
import { verifyAdmin } from "../middleware/authorization"; // ✅ Import verifyAdmin
import { createLoan, reviewLoans, approveLoan } from "../controllers/loanController";


const router = express.Router();

/**
 * @route POST /api/v1/loans/create
 * @desc Create a new loan application
 * @access Authenticated Users
 */
router.post("/create", authenticateUser, async (req, res, next) => {
  try {
    await createLoan(req, res);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/v1/loans/review
 * @desc Get all pending loan applications
 * @access Officers & Admins only
 */
router.get("/review", authenticateUser, async (req, res, next) => {
  try {
    await verifyAdmin(["officer", "admin"])(req, res, next);
    await reviewLoans(req, res);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/v1/loans/approve
 * @desc Approve a loan application
 * @access Admins only
 */
router.post("/approve", authenticateUser, async (req, res, next) => {
  try {
    await verifyAdmin(["admin"])(req, res, next);
    await approveLoan(req, res);
    next();
  } catch (error) {
    next(error);
  }
});

export default router;
