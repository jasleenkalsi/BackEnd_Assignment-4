import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config(); // ✅ Load environment variables

const firebaseConfigPath = process.env.FIREBASE_CONFIG;

// ✅ Ensure FIREBASE_CONFIG is properly set
if (!firebaseConfigPath) {
  throw new Error("Missing FIREBASE_CONFIG environment variable.");
}

// ✅ Resolve full path and check if file exists
const fullPath = path.resolve(__dirname, "..", firebaseConfigPath);
if (!fs.existsSync(fullPath)) {
  throw new Error(`Firebase config file not found at path: ${fullPath}`);
}

// ✅ Read and parse the JSON file
const serviceAccount = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
