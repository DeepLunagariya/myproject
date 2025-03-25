const express = require('express');
const { addToCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/cart', authMiddleware, addToCart);
router.delete('/cart/:id', authMiddleware, removeFromCart);

module.exports = router;
