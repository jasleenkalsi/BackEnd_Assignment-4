"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // Load environment variables
// Initialize Firebase Admin SDK with Service Account Key
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(path_1.default.resolve(__dirname, "../../high-risk-loan-monitorin-8ade9-firebase-adminsdk-fbsvc-751162c457.json") // Ensure correct path
    ),
});
exports.auth = firebase_admin_1.default.auth();
exports.default = firebase_admin_1.default;
