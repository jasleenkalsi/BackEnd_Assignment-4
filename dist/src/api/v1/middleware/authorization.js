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
exports.verifyAdmin = void 0;
const firebase_1 = __importDefault(require("../../../../config/firebase"));
// ✅ Ensure verifyAdmin returns a middleware function
const verifyAdmin = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                res.status(401).json({ error: "Unauthorized - Missing token" });
                return;
            }
            // Decode the token
            const decodedToken = yield firebase_1.default.auth().verifyIdToken(token);
            // Attach user to request for future use
            req.user = {
                uid: decodedToken.uid,
                role: ((_b = decodedToken.customClaims) === null || _b === void 0 ? void 0 : _b.role) || "user", // Default role if missing
            };
            // Check if user has the required role
            if (!allowedRoles.includes(req.user.role)) {
                res.status(403).json({ error: "Access denied - Insufficient permissions" });
                return;
            }
            next(); // ✅ Proceed if user has the required role
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Invalid or expired token";
            res.status(403).json({ error: errorMessage });
            return; // ✅ Ensure the function exits properly
        }
    });
};
exports.verifyAdmin = verifyAdmin;
