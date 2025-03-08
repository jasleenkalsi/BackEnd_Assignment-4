"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define Loan Application Schema
const LoanSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
// Create and export Loan model
const Loan = (0, mongoose_1.model)("Loan", LoanSchema);
exports.default = Loan;
