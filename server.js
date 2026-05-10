import express from "express";
import cors from "cors";
import { data } from "./data.js";

const app = express();
app.use(cors());

// MUST match the frontend fetch URL
app.get("/professional", (req, res) => {
  res.json(data);
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
