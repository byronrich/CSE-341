import express from "express";
import {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
} from "../controllers/contacts.js";

const router = express.Router();

// GET all contacts
router.get("/", getAllContacts);

// GET one contact by ID
router.get("/:id", getSingleContact);

// POST create a new contact
router.post("/", createContact);

// PUT update an existing contact
router.put("/:id", updateContact);

// DELETE remove a contact
router.delete("/:id", deleteContact);

export default router;
