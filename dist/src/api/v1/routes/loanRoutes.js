"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const authorization_1 = require("../middleware/authorization");
const loanController_1 = require("../controllers/loanController");
const router = express_1.default.Router();
/**
 * Utility function to handle async route handlers
 * Ensures errors are passed to Express error middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
/**
 * @route POST /api/v1/loans/create
 * @desc Create a new loan application
 * @access Authenticated Users
 */
router.post("/create", authentication_1.authenticateUser, asyncHandler(loanController_1.createLoan));
/**
 * @route GET /api/v1/loans/review
 * @desc Get all pending loan applications
 * @access Officers & Admins only
 */
router.get("/review", authentication_1.authenticateUser, (0, authorization_1.verifyAdmin)(["officer", "admin"]), asyncHandler(loanController_1.reviewLoans));
/**
 * @route POST /api/v1/loans/approve
 * @desc Approve a loan application
 * @access Admins only
 */
router.post("/approve", authentication_1.authenticateUser, (0, authorization_1.verifyAdmin)(["admin"]), asyncHandler(loanController_1.approveLoan));
exports.default = router;
