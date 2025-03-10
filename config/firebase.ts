import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const firebaseConfigPath = process.env.FIREBASE_CONFIG;

if (!firebaseConfigPath) {
    throw new Error("❌ Missing FIREBASE_CONFIG environment variable.");
}

// ✅ Ensure file exists
const fullPath = path.resolve(__dirname, "..", firebaseConfigPath);
if (!fs.existsSync(fullPath)) {
    throw new Error(`❌ Firebase config file not found at: ${fullPath}`);
}

// ✅ Read and parse service account JSON
const serviceAccount = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

// ✅ Prevent multiple Firebase initializations
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default admin;
