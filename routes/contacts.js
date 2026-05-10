import express from "express";
import { connectDB } from "../db/connect.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET ALL CONTACTS
router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const contacts = await db.collection("contacts").find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ONE CONTACT BY ID
router.get("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
