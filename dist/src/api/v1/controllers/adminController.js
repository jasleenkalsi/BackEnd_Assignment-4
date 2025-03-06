"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRole = void 0;
const firebase_1 = __importDefault(require("../../../../config/firebase")); // ✅ Ensure correct import
/**
 * Assign a role to a user (Admin only)
 */
const setUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, role } = req.body;
        // ✅ Validate input
        if (!uid || !role) {
            res.status(400).json({ error: "UID and role are required" });
            return;
        }
        // ✅ Validate role
        const validRoles = ["admin", "user", "loan_officer"];
        if (!validRoles.includes(role)) {
            res.status(400).json({ error: "Invalid role provided" });
            return;
        }
        // ✅ Assign role to the user
        yield firebase_1.default.auth().setCustomUserClaims(uid, { role });
        res.status(200).json({ message: `Role '${role}' assigned to user ${uid}` });
    }
    catch (error) { // ✅ Explicitly type error as unknown
        if (error instanceof Error) {
            res.status(500).json({ error: "Failed to set role", details: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.setUserRole = setUserRole;
