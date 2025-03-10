import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../src/api/v1/middleware/authentication";
import { verifyAdmin } from "../src/api/v1/middleware/authorization";

// Mock Express app
const app = express();
app.use(express.json());

// Mock protected routes
app.get("/protected", authenticateUser, (req: Request, res: Response) => {
    res.status(200).json({ message: "Access granted." });
});

app.get("/admin", authenticateUser, verifyAdmin(["admin"]), (req: Request, res: Response) => {
    res.status(200).json({ message: "Admin access granted." });
});

// Mock valid and invalid Firebase tokens
const mockValidToken = "VALID_FIREBASE_TOKEN";
const mockInvalidToken = "INVALID_FIREBASE_TOKEN";

// Mock Firebase authentication
jest.mock("../src/config/firebase", () => ({
    auth: () => ({
        verifyIdToken: jest.fn((token) => {
            if (token === mockValidToken) {
                return Promise.resolve({ uid: "user123", role: "admin" });
            } else {
                return Promise.reject(new Error("Invalid token"));
            }
        }),
    }),
}));

describe("Authentication Middleware Tests", () => {
    it("should return 401 if no token is provided", async () => {
        const response = await request(app).get("/protected");
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized: No token provided.");
    });

    it("should return 401 if an invalid token is provided", async () => {
        const response = await request(app)
            .get("/protected")
            .set("Authorization", `Bearer ${mockInvalidToken}`);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized: Authentication failed.");
    });

    it("should allow access with a valid token", async () => {
        const response = await request(app)
            .get("/protected")
            .set("Authorization", `Bearer ${mockValidToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Access granted.");
    });
});

describe("Authorization Middleware Tests", () => {
    it("should return 403 if user is not an admin", async () => {
        const response = await request(app)
            .get("/admin")
            .set("Authorization", `Bearer ${mockValidToken}`); // User is not an admin in this test
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Forbidden: Insufficient permissions.");
    });

    it("should allow access to admin route with proper role", async () => {
        jest.mock("../src/config/firebase", () => ({
            auth: () => ({
                verifyIdToken: jest.fn(() =>
                    Promise.resolve({ uid: "admin123", role: "admin" })
                ),
            }),
        }));

        const response = await request(app)
            .get("/admin")
            .set("Authorization", `Bearer ${mockValidToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Admin access granted.");
    });
});
