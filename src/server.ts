import app from "./app";
import { Request, Response, NextFunction } from "express";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);

    // ✅ Debug: List all registered routes
    console.log("Registered Routes:");
    app._router.stack.forEach((r: any) => {
        if (r.route && r.route.path) {
            console.log(`✔ ${r.route.path}`);
        }
    });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found." });
});


export default app;
