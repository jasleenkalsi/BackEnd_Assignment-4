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
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Unauthorized - Missing token" });
            return;
        }
        // Decode the token
        const decodedToken = yield firebase_1.default.auth().verifyIdToken(token);
        // Check if user has admin role
        if (((_b = decodedToken.customClaims) === null || _b === void 0 ? void 0 : _b.role) !== "admin") {
            res.status(403).json({ error: "Access denied - Admins only" });
            return;
        }
        next(); // ✅ Proceed if user is admin
    }
    catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
});
exports.verifyAdmin = verifyAdmin;
