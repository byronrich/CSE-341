import { ObjectId } from "mongodb";
import { getDB } from "../db/connect.js";

// GET all contacts
export const getAllContacts = async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one contact by ID
export const getSingleContact = async (req, res) => {
  try {
    const db = getDB();
    const contactId = new ObjectId(req.params.id);

    const contact = await db.collection("contacts").findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
