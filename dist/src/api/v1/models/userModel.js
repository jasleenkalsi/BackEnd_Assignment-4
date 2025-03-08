"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define User Schema
const UserSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ["user", "officer", "admin"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
// Create and export User model
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
