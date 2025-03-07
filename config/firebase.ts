import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables from .env file

const firebaseConfig = process.env.FIREBASE_CONFIG;

if (!firebaseConfig) {
  throw new Error("Missing FIREBASE_CONFIG environment variable.");
}

// ✅ Parse the Firebase config
const serviceAccount = JSON.parse(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
