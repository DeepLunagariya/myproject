const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  try {
    // Save contact form data to the database
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    // Create a transporter object using your SMTP configuration (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    // Define the email options
    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL, // The recipient email address
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Contact form submitted successfully, and email sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact form', error: error.message });
  }
};

module.exports = {
  submitContactForm,
};
