import express from "express";
import morgan from "morgan";
import setupSwagger from "../config/swagger";
import cors from "cors";
import loanRoutes from "./api/v1/routes/loanRoutes";
import adminRoutes from "./api/v1/routes/adminRoute";
import userRoutes from "./api/v1/routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
