import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

// Load Firebase credentials
let serviceAccount;
try {
    serviceAccount = require(path.join(__dirname, "../serviceAccountKey.json"));
} catch (error) {
    console.error("Firebase service account key is missing or incorrect:", error);
}

// Initialize Firebase only if not already initialized
if (!admin.apps.length && serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    console.error("Failed to initialize Firebase. Check serviceAccountKey.json.");
}

export default admin;
