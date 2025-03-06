import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Load environment variables

// Initialize Firebase Admin SDK with Service Account Key
admin.initializeApp({
    credential: admin.credential.cert(
        path.resolve(__dirname, "../../serviceAccountjson") // Ensure correct path
    ),
});

export const auth = admin.auth();
export default admin;
