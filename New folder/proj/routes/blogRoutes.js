const express = require('express');
const {
  getAllBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Admin routes (authMiddleware ensures only authenticated users can add/update/delete blogs)
router.post('/', authMiddleware, addBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;
