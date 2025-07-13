const express = require('express');
const router = express.Router();
const { 
  createBookmark, 
  getBookmarks, 
  getBookmarkById, 
  updateBookmark, 
  deleteBookmark 
} = require('../controllers/bookmarks');
const { protect } = require('../middlewares/auth');

router.route('/')
  .post(protect, createBookmark)
  .get(protect, getBookmarks);

router.route('/:id')
  .get(protect, getBookmarkById)
  .put(protect, updateBookmark)
  .delete(protect, deleteBookmark);

module.exports = router;