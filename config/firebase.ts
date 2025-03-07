import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config(); // ✅ Load environment variables

const firebaseConfigPath = process.env.FIREBASE_CONFIG;

if (!firebaseConfigPath) {
  throw new Error("Missing FIREBASE_CONFIG environment variable.");
}

// ✅ Ensure the file exists
const fullPath = path.resolve(__dirname, "..", firebaseConfigPath);
if (!fs.existsSync(fullPath)) {
  throw new Error(`Firebase config file not found at path: ${fullPath}`);
}

// ✅ Read JSON file instead of parsing an incorrect string
const serviceAccount = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;

