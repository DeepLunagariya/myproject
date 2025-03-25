import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const port = 5000;

// Enable CORS for the frontend origin
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Allow requests from your front-end origin
  methods: ['GET', 'POST'], // Specify allowed methods
}));



app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  



// 1. Connecting MongoDB
mongoose
  .connect('mongodb://localhost:27017', {
    dbName: 'AgriVerse',  
  })
  .then(() => console.log('Database connected'))
  .catch((e) => console.log('Database connection error:', e));

// 2. Schema Definition
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 3. Model Definition
const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);

// 4. API Endpoint for Form Submission
app.post("/submit-form", async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("Request received with data:", req.body);  // For debugging
  
  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();  // Save to MongoDB
    res.status(201).send("Message saved successfully");
  } catch (error) {
    res.status(500).send("Error saving message: " + error.message);
  }
});

//api for sign up
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  console.log("Received Data:", req.body); // Debugging log

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user: ' + error.message);
  }
});

//api for sign in
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Compare the password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send('Invalid password');
    }

    // If authentication is successful
    res.status(200).send('User signed in successfully');
  } catch (error) {
    res.status(500).send('Error signing in: ' + error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
