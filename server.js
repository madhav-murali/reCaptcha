const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, message, 'g-recaptcha-response': recaptchaResponse } = req.body;

  // Verify reCAPTCHA
  const secretKey = '6Lep4cMqAAAAACVSVzX3VTYJWCqfxEJKxcZerJOu';
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

  try {
    const recaptchaVerification = await axios.post(verificationUrl);
    if (!recaptchaVerification.data.success) {
      return res.json({ success: false, message: 'reCAPTCHA verification failed. Please try again.' });
    }

    // Process form data (e.g., save to database, send email, etc.)
    console.log('Form Data:', { name, email, message });

    // Send success response
    res.json({ success: true, message: 'Thank you! Your message has been sent.' });
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});