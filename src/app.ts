import express from "express";
import cors from "cors";
import loanRoutes from "./api/v1/routes/loanRoutes";
import adminRoutes from "./api/v1/routes/adminRoute";
import { setupSwagger } from "../config/swagger"; // ✅ Make sure this matches the export

// Import swagger setup

const app = express();
app.use(express.json());
app.use(cors());

// Register routes
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/admin", adminRoutes);

// Setup Swagger Docs
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;