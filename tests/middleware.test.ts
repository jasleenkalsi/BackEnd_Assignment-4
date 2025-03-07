import request from "supertest";
import app from "../src/app"; // ✅ Correct import

describe("Middleware Tests - Authentication & Authorization", () => {
    let validUserToken: string;
    let validOfficerToken: string;
    let validManagerToken: string;
    let invalidToken: string = "invalid_token";

    beforeAll(async () => {
        // Mock valid tokens (Replace with actual Firebase token retrieval)
        validUserToken = "mocked_valid_user_token";
        validOfficerToken = "mocked_valid_officer_token";
        validManagerToken = "mocked_valid_manager_token";
    });

    /** ✅ Authentication Middleware Tests **/
    it("should return 401 if no token is provided", async () => {
        const response = await request(app).get("/api/v1/protected-route");
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized: No token provided.");
    });

    it("should return 401 if an invalid token is provided", async () => {
        const response = await request(app)
            .get("/api/v1/protected-route")
            .set("Authorization", `Bearer ${invalidToken}`);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized: Invalid token.");
    });

    it("should allow access with a valid token", async () => {
        const response = await request(app)
            .get("/api/v1/protected-route")
            .set("Authorization", `Bearer ${validUserToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Access granted.");
    });

    /** ✅ Authorization Middleware Tests **/
    it("should deny access if user role is not authorized", async () => {
        const response = await request(app)
            .post("/api/v1/loans/approve")
            .set("Authorization", `Bearer ${validUserToken}`);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Forbidden: Insufficient permissions.");
    });

    it("should allow an officer to review loans", async () => {
        const response = await request(app)
            .get("/api/v1/loans/review")
            .set("Authorization", `Bearer ${validOfficerToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan review accessed.");
    });

    it("should allow a manager to approve loans", async () => {
        const response = await request(app)
            .post("/api/v1/loans/approve")
            .set("Authorization", `Bearer ${validManagerToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan approved successfully.");
    });
});
