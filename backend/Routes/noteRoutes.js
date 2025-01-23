const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote, getNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');

router.get('/', auth, getNotes); // Protect the route
router.post('/', auth, createNote);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);
router.get('/:id', auth, getNote);

module.exports = router;
