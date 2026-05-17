import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactsRoutes from "./routes/contacts.js";
import { connectDB } from "./db/connect.js";

// Swagger imports
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/contacts", contactsRoutes);

// CONNECT TO DB, THEN START SERVER
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
