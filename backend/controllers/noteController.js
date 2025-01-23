const Note = require("../models/Notes");

// Get all notes for a specific user
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }); // Fetch notes for the logged-in user
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch notes", error: error.message });
  }
};

// Get a single note
const getNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch note", error: error.message });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const newNote = await Note.create({
      title,
      content,
      user: req.userId, // Assign the note to the logged-in user
    });
    res.status(201).json(newNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create note", error: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: req.userId }, // Ensure the note belongs to the logged-in user
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update note", error: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      user: req.userId,
    }); // Ensure the note belongs to the user

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: error.message });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNote
};
