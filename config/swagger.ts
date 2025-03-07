import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger configuration
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "High-Risk Loan Application Monitoring API",
      version: "1.0.0",
      description: "API documentation for the loan monitoring system.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"], // Adjust path if needed
};

const swaggerSpec = swaggerJsdoc(options);

// ✅ Export as default function
const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger; // ✅ Ensure default export
