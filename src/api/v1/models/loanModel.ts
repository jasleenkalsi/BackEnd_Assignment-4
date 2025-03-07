import { Schema, model } from "mongoose";

// Define Loan Application Schema
const LoanSchema = new Schema(
  {
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 100, // Minimum loan amount
    },
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create and export Loan model
const Loan = model("Loan", LoanSchema);
export default Loan;
