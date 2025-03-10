// loan.test.ts
import request from "supertest";
import app from "../src/app";
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
        initializeApp: jest.fn()
    };
});

describe("Loan Application API Tests", () => {
    it("should allow an officer to create a loan application", async () => {
        const response = await request(app)
            .post("/api/v1/loan")
            .set("Authorization", "Bearer validOfficerToken")
            .send({ amount: 10000, term: 12, rate: 5.5, clientId: "12345" });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Loan application submitted.");
    });

    it("should return error for missing fields in loan application", async () => {
        const response = await request(app)
            .post("/api/v1/loan")
            .set("Authorization", "Bearer validOfficerToken")
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid loan application data.");
    });

    it("should allow a manager to approve a loan", async () => {
        const response = await request(app)
            .post("/api/v1/loan/approve")
            .set("Authorization", "Bearer validManagerToken")
            .send({ loanId: "12345" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan approved successfully.");
    });

    it("should return 404 for non-existent loan", async () => {
        const response = await request(app)
            .post("/api/v1/loan/approve")
            .set("Authorization", "Bearer validManagerToken")
            .send({ loanId: "99999" });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Loan not found.");
    });
});