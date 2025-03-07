import { Response } from "express";
import { AuthenticatedRequest } from "../../../types/express";

/**
 * @desc Create a new loan application
 * @route POST /api/v1/loans/create
 * @access Authenticated Users
 */
export const createLoan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { applicantName, amount, riskLevel } = req.body;

    // Validate input
    if (!applicantName || !amount || !riskLevel) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Simulate saving loan application to a database
    const newLoan = {
      id: Math.floor(Math.random() * 10000), // Mock ID (replace with DB storage)
      applicantName,
      amount,
      riskLevel,
      status: "Pending",
    };

    return res.status(201).json({ message: "Loan application created", loan: newLoan });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error instanceof Error ? error.message : String(error) });
  }
};

/**
 * @desc Get all pending loan applications
 * @route GET /api/v1/loans/review
 * @access Officers & Admins only
 */
export const reviewLoans = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || (req.user.role !== "officer" && req.user.role !== "admin")) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    // Mock data (Replace with DB query)
    const pendingLoans = [
      { id: 1, applicantName: "Alice", amount: 10000, riskLevel: "High", status: "Pending" },
      { id: 2, applicantName: "Bob", amount: 5000, riskLevel: "Medium", status: "Pending" },
    ];

    return res.status(200).json({ loans: pendingLoans });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error instanceof Error ? error.message : String(error) });
  }
};

/**
 * @desc Approve a loan application
 * @route POST /api/v1/loans/approve
 * @access Admins only
 */
export const approveLoan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Only admins can approve loans" });
    }

    const { loanId } = req.body;

    if (!loanId) {
      return res.status(400).json({ error: "Loan ID is required" });
    }

    // Simulate updating loan status (Replace with DB update query)
    const updatedLoan = { id: loanId, status: "Approved" };

    return res.status(200).json({ message: "Loan approved", loan: updatedLoan });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error instanceof Error ? error.message : String(error) });
  }
};