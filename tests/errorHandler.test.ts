import request from "supertest";
import app from "../src/app";

describe("Global Error Handling Middleware Tests", () => {
    it("should return 500 for internal server error", async () => {
        const response = await request(app).get("/api/v1/trigger-error");
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Internal Server Error.");
    });

    it("should return 404 for non-existent route", async () => {
        const response = await request(app).get("/api/v1/non-existent");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Route not found.");
    });
});
