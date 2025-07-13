const Note = require('../models/Note');
const { noteSchema } = require('../utils/validation');
const asyncHandler = require('express-async-handler');

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
exports.createNote = asyncHandler(async (req, res) => {
  const { title, content, tags, isFavorite } = noteSchema.parse(req.body);
  
  const note = new Note({
    user: req.user._id,
    title,
    content,
    tags: tags || [],
    isFavorite: isFavorite || false,
  });
  
  const createdNote = await note.save();
  res.status(201).json(createdNote);
});

// @desc    Get all notes
// @route   GET /api/notes
// @access  Private
exports.getNotes = asyncHandler(async (req, res) => {
  const { q, tags } = req.query;
  let query = { user: req.user._id };
  
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
    ];
  }
  
  if (tags) {
    const tagArray = tags.split(',');
    query.tags = { $in: tagArray };
  }
  
  const notes = await Note.find(query).sort('-createdAt');
  res.json(notes);
});

// @desc    Get note by ID
// @route   GET /api/notes/:id
// @access  Private
exports.getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  
  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
exports.updateNote = asyncHandler(async (req, res) => {
  const { title, content, tags, isFavorite } = noteSchema.parse(req.body);
  
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  
  if (note) {
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;
    note.isFavorite = isFavorite !== undefined ? isFavorite : note.isFavorite;
    note.updatedAt = Date.now();
    
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  
  if (note) {
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});