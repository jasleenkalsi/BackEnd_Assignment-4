import express from "express";
import morgan from "morgan";
import cors from "cors";
import { setupSwagger } from "../config/swagger"; // ✅ Ensure correct path
import loanRoutes from "./api/v1/routes/loanRoutes";
import adminRoutes from "./api/v1/routes/adminRoute";
import userRoutes from "./api/v1/routes/userRoutes"; // ✅ Ensure correct import

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Register Routes
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);

// ✅ Setup Swagger API Documentation
setupSwagger(app);

// ✅ Export app (without calling `app.listen()` here)
export default app;
