const express = require('express');
const { submitContactForm } = require('../controllers/contactController');
const router = express.Router();

// Route to submit contact form
router.post('/', submitContactForm);

module.exports = router;
