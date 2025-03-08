"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // ✅ Load environment variables
const firebaseConfigPath = process.env.FIREBASE_CONFIG;
if (!firebaseConfigPath) {
    throw new Error("Missing FIREBASE_CONFIG environment variable.");
}
// ✅ Ensure the file exists
const fullPath = path_1.default.resolve(__dirname, "..", firebaseConfigPath);
if (!fs_1.default.existsSync(fullPath)) {
    throw new Error(`Firebase config file not found at path: ${fullPath}`);
}
// ✅ Read JSON file instead of parsing an incorrect string
const serviceAccount = JSON.parse(fs_1.default.readFileSync(fullPath, "utf-8"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
exports.default = firebase_admin_1.default;
