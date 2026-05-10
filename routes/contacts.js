import express from "express";
import { getAllContacts, getSingleContact } from "../controllers/contacts.js";

const router = express.Router();

// GET all contacts
router.get("/", getAllContacts);

// GET one contact by ID
router.get("/:id", getSingleContact);

export default router;
