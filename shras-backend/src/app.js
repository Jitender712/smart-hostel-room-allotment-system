import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import allotmentRoutes from "./routes/allotmentRoutes.js";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/allotments", allotmentRoutes);

// Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;