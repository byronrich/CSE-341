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

// POST create a new contact
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Required fields check
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const db = getDB();
    const newContact = { firstName, lastName, email, favoriteColor, birthday };

    const result = await db.collection("contacts").insertOne(newContact);

    res.status(201).json({
      message: "Contact created successfully",
      id: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update an existing contact
export const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Required fields check
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const db = getDB();
    const result = await db
      .collection("contacts")
      .replaceOne({ _id: contactId }, updatedContact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // 204 = success, no content
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE remove a contact
export const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = getDB();

    const result = await db
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // 204 = success, no content
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
