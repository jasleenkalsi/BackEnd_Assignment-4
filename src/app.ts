import express from "express";
import cors from "cors";
import morgan from "morgan";
import loanRoutes from "./api/v1/routes/loanRoutes";
import adminRoutes from "./api/v1/routes/adminRoute";
import userRoutes from "./api/v1/routes/userRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);



export default app;
