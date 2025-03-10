import request from "supertest";
import app from "../src/app"; 


describe("Authentication Middleware Tests", () => {
    let validToken: string;
    let invalidToken: string = "invalid_token";

    beforeAll(async () => {
        // Simulate fetching a valid token (Replace with actual Firebase token retrieval)
        validToken = "AIzaSyC45MmwpjCB7DTsluuj-VvLl9TToZZ2ikU";
    });

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
            .set("Authorization", `Bearer ${validToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Access granted.");
    });
});
