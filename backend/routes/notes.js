const express = require('express');
const router = express.Router();
const { 
  createNote, 
  getNotes, 
  getNoteById, 
  updateNote, 
  deleteNote 
} = require('../controllers/notes');
const { protect } = require('../middlewares/auth');

router.route('/')
  .post(protect, createNote)
  .get(protect, getNotes);

router.route('/:id')
  .get(protect, getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;