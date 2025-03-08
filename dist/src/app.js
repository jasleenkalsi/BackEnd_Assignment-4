"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("../config/swagger"); // ✅ Ensure correct path
const loanRoutes_1 = __importDefault(require("./api/v1/routes/loanRoutes"));
const adminRoute_1 = __importDefault(require("./api/v1/routes/adminRoute"));
const userRoutes_1 = __importDefault(require("./api/v1/routes/userRoutes")); // ✅ Ensure correct import
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// Register Routes
app.use("/api/v1/loans", loanRoutes_1.default);
app.use("/api/v1/admin", adminRoute_1.default);
app.use("/api/v1/users", userRoutes_1.default);
// ✅ Setup Swagger API Documentation
(0, swagger_1.setupSwagger)(app);
// ✅ Export app (without calling `app.listen()` here)
exports.default = app;
