const Bookmark = require('../models/Bookmark');
const { bookmarkSchema } = require('../utils/validation');
const { fetchTitle } = require('../utils/fetchMetadata');
const asyncHandler = require('express-async-handler');

// @desc    Create a new bookmark
// @route   POST /api/bookmarks
// @access  Private
exports.createBookmark = asyncHandler(async (req, res) => {
  const { url, title, description, tags, isFavorite } = bookmarkSchema.parse(req.body);
  
  let finalTitle = title;
  if (!title) {
    finalTitle = await fetchTitle(url);
  }
  
  const bookmark = new Bookmark({
    user: req.user._id,
    url,
    title: finalTitle,
    description: description || '',
    tags: tags || [],
    isFavorite: isFavorite || false,
  });
  
  const createdBookmark = await bookmark.save();
  res.status(201).json(createdBookmark);
});

// @desc    Get all bookmarks
// @route   GET /api/bookmarks
// @access  Private
exports.getBookmarks = asyncHandler(async (req, res) => {
  const { q, tags } = req.query;
  let query = { user: req.user._id };
  
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { url: { $regex: q, $options: 'i' } },
    ];
  }
  
  if (tags) {
    const tagArray = tags.split(',');
    query.tags = { $in: tagArray };
  }
  
  const bookmarks = await Bookmark.find(query).sort('-createdAt');
  res.json(bookmarks);
});

// @desc    Get bookmark by ID
// @route   GET /api/bookmarks/:id
// @access  Private
exports.getBookmarkById = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
  
  if (bookmark) {
    res.json(bookmark);
  } else {
    res.status(404);
    throw new Error('Bookmark not found');
  }
});

// @desc    Update bookmark
// @route   PUT /api/bookmarks/:id
// @access  Private
exports.updateBookmark = asyncHandler(async (req, res) => {
  const { url, title, description, tags, isFavorite } = bookmarkSchema.parse(req.body);
  
  const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
  
  if (bookmark) {
    bookmark.url = url || bookmark.url;
    bookmark.title = title || bookmark.title;
    bookmark.description = description || bookmark.description;
    bookmark.tags = tags || bookmark.tags;
    bookmark.isFavorite = isFavorite !== undefined ? isFavorite : bookmark.isFavorite;
    bookmark.updatedAt = Date.now();
    
    const updatedBookmark = await bookmark.save();
    res.json(updatedBookmark);
  } else {
    res.status(404);
    throw new Error('Bookmark not found');
  }
});

// @desc    Delete bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
exports.deleteBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
  
  if (bookmark) {
    await bookmark.deleteOne();
    res.json({ message: 'Bookmark removed' });
  } else {
    res.status(404);
    throw new Error('Bookmark not found');
  }
});