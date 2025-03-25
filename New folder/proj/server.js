// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests
app.use(morgan('dev')); // Logger for development

// Set EJS as the view engine
app.set('view engine', 'ejs'); // Setting EJS as the template engine
app.set('views', path.join(__dirname, 'views')); // Specify the 'views' folder for EJS templates

// Load environment variables from the .env file
const mongoURI = process.env.MONGO_URI; // MongoDB connection string
const port = process.env.PORT || 5000; // Port number

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Route imports
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Use Routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/users', userRoutes); // User authentication routes (register/login)
app.use('/api/blogs', blogRoutes); // Blog/Expert-Talk routes
app.use('/api/cart', cartRoutes); // Cart routes
app.use('/api/contact', contactRoutes); // Contact form submission route

// Serve static files from the "public" folder
app.use(express.static('public'));

// Dynamic Pages Rendering using EJS
app.get('/', async (req, res) => {
  try {
    // Fetch featured products from MongoDB
    const products = await Product.find(); // Replace 'Product' with your actual product model
    res.render('index', { products }); // Pass the products to the EJS template
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products");
  }
});

app.get('/shop', (req, res) => {
  res.render('shop'); // Render the shop.ejs file from the views folder
});

app.get('/about', (req, res) => {
  res.render('about'); // Render the about.ejs file from the views folder
});

app.get('/contact', (req, res) => {
  res.render('contact'); // Render the contact.ejs file from the views folder
});

app.get('/expert-talks', (req, res) => {
  res.render('expert-talks'); // Render the expert-talks.ejs file from the views folder
});

// Test Route
app.get('/test', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
