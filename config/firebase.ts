import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config(); // ✅ Automatically loads .env

if (!process.env.FIREBASE_CONFIG) {
  throw new Error("Missing FIREBASE_CONFIG environment variable.");
}

// ✅ Decode Base64 JSON safely
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_CONFIG, "base64").toString("utf-8")
);

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
export default admin;
