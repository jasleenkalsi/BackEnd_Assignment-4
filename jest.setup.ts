// jest.setup.ts
import admin from "firebase-admin";

jest.mock("firebase-admin", () => {
    const auth = {
        verifyIdToken: jest.fn(async (token) => {
            if (token === "validUserToken") {
                return { uid: "user123", role: "user" };
            } else if (token === "validOfficerToken") {
                return { uid: "officer123", role: "officer" };
            } else if (token === "validManagerToken") {
                return { uid: "manager123", role: "manager" };
            } else {
                throw new Error("Invalid token");
            }
        })
    };
    return {
        auth: () => auth,
        initializeApp: jest.fn(),
        credential: {
            cert: jest.fn()
        },
        apps: [{}], // ✅ Mock `admin.apps.length` so it is not undefined
    };
});