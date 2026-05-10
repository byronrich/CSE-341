import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactsRoutes from "./routes/contacts.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/contacts", contactsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
