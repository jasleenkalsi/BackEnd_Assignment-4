import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Load environment variables

// Initialize Firebase Admin SDK with Service Account Key
admin.initializeApp({
    credential: admin.credential.cert(
        path.resolve(__dirname, "../../high-risk-loan-monitorin-8ade9-firebase-adminsdk-fbsvc-751162c457.json") // Ensure correct path
    ),
});

export const auth = admin.auth();
export default admin;
