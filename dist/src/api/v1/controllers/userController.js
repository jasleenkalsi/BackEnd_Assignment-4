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
exports.getUserDetails = void 0;
const firebase_1 = __importDefault(require("../../../../config/firebase")); // ✅ Ensure correct import path
// ✅ Ensure function signature returns `Promise<void>` and modifies `res` directly
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const uid = req.params.uid;
        // Fetch user details from Firebase Auth
        const user = yield firebase_1.default.auth().getUser(uid);
        // ✅ Modify `res` directly instead of returning a response
        res.status(200).json({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: ((_a = user.customClaims) === null || _a === void 0 ? void 0 : _a.role) || "user",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
});
exports.getUserDetails = getUserDetails;
