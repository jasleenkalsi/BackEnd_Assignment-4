import request from "supertest";
import app from "../src/app";

describe("Loan Application API Tests", () => {
    let officerToken: string;
    let managerToken: string;

    beforeAll(async () => {
        officerToken = "mocked_officer_token";
        managerToken = "mocked_manager_token";
    });

    it("should allow an officer to create a loan application", async () => {
        const response = await request(app)
            .post("/api/v1/loans/create")
            .set("Authorization", `Bearer ${officerToken}`)
            .send({
                applicantName: "John Doe",
                amount: 50000,
                riskLevel: "High",
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Loan application submitted.");
    });

    it("should return error for missing fields in loan application", async () => {
        const response = await request(app)
            .post("/api/v1/loans/create")
            .set("Authorization", `Bearer ${officerToken}`)
            .send({
                applicantName: "John Doe",
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid loan application data.");
    });

    it("should allow a manager to approve a loan", async () => {
        const response = await request(app)
            .post("/api/v1/loans/approve")
            .set("Authorization", `Bearer ${managerToken}`)
            .send({ loanId: "12345" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan approved successfully.");
    });

    it("should return 404 for non-existent loan", async () => {
        const response = await request(app)
            .post("/api/v1/loans/approve")
            .set("Authorization", `Bearer ${managerToken}`)
            .send({ loanId: "99999" });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Loan not found.");
    });
});
