const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// User Schema
const userSchema = new mongoose.Schema({
  businessName: String, // For businesses
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  foodType: String, // Only for recipients specifying needed food
});

const User = mongoose.model('User', userSchema);

//recipiant
const recipientSchema = new mongoose.Schema({
  userType: { type: String, enum: ['Business', 'Recipient'], required: true }, // Add userType
  businessName: String, // For businesses
  organizationName: String, // For recipients
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  foodType: String, // Only for recipients specifying needed food
});

const RecipientUser = mongoose.model('RecipientUser', recipientSchema);


// Food Donation Schema
const donationSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  email: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  location: { type: String, required: true },
});

const Donation = mongoose.model('Donation', donationSchema);

// Recipient Requirement Schema
const recipientRequirementSchema = new mongoose.Schema({
  foodNeeded: { type: String, required: true },
  location: { type: String, required: true },
  quantity: { type: Number, required: true },
  mobileNumber: { type: String, required: true },
  countryCode: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const RecipientRequirement = mongoose.model("RecipientRequirement", recipientRequirementSchema);

const requestSchema = new mongoose.Schema({
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  organizationName: { type: String, required: true },
  requestDate: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now, index: { expires: "3m" } }, // TTL index
});

const Request = mongoose.model("Request", requestSchema);


const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: "3m" } }, // TTL index
});

const Notification = mongoose.model('Notification', notificationSchema);
// Routes

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { businessName, email, password, location, foodType } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      businessName,
      email,
      password: hashedPassword,
      location,
      foodType,
    });

    await newUser.save();

    // Generate a token (optional)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Sign-in Route
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      message: 'Sign-in successful',
      email: user.email,
      businessName: user.businessName,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Food Donation Route
app.post('/api/donations', async (req, res) => {
  try {
    const { businessName, email, foodType, quantity, expirationDate, location } = req.body;

    if (!businessName || !email || !foodType || !quantity || !location || !expirationDate) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number." });
    }
    if (new Date(expirationDate) <= new Date()) {
      return res.status(400).json({ error: "Expiration date must be in the future." });
    }

    const newDonation = new Donation({
      businessName,
      email,
      foodType,
      quantity,
      expirationDate,
      location:location || "Unknown Location", // Fallback if location is not provided
    });

    await newDonation.save();
    res.json({ message: "Donation added successfully" });
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});


// Get Donations
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Edit Donation
app.put("/api/donations/:id", async (req, res) => {
  const { id } = req.params;
  const { foodType, quantity, type, location, expirationDate } = req.body;

  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      id,
      { foodType, quantity, type, location, expirationDate },
      { new: true }
    );
    if (!updatedDonation) return res.status(404).json({ error: "Donation not found." });
    res.json(updatedDonation);
  } catch (error) {
    console.error("Error updating donation:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// Delete Donation
app.delete("/api/donations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDonation = await Donation.findByIdAndDelete(id);
    if (!deletedDonation) return res.status(404).json({ error: "Donation not found." });
    res.json({ message: "Donation deleted successfully." });
  } catch (error) {
    console.error("Error deleting donation:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// Recipient Signup Route
app.post('/api/recipient/signup', async (req, res) => {
  const { organizationName, email, password, location, foodType } = req.body;

  try {
    const existingRecipientUser = await RecipientUser.findOne({ email });
    if (existingRecipientUser) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRecipientUser = new RecipientUser({
      userType: 'Recipient',
      organizationName,
      email,
      password: hashedPassword,
      location,
      foodType,
    });

    await newRecipientUser.save(); // Save the correct object here


    res.json({ message: 'Recipient registered successfully' });
  } catch (error) {
    console.error('Error during recipient signup:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Recipient Sign-in Route
app.post('/api/recipient/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const recipientUser = await RecipientUser.findOne({ email, userType: 'Recipient' });
    if (!recipientUser) return res.status(400).json({ error: 'Recipient not found' });

    const isMatch = await bcrypt.compare(password, recipientUser.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: recipientUser._id, email: recipientUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      message: 'Sign-in successful',
      email: recipientUser.email,
      organizationName: recipientUser.organizationName,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit Requirements Route
app.post("/api/recipient/submit", async (req, res) => {
  const { foodNeeded, location, quantity, mobileNumber, countryCode } = req.body;

  if (!foodNeeded || !location || !quantity || !mobileNumber || !countryCode) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newRequirement = new RecipientRequirement({
      foodNeeded,
      location,
      quantity,
      mobileNumber,
      countryCode,
    });

    await newRequirement.save();
    res.json({ message: "Requirement submitted successfully!" });
  } catch (error) {
    console.error("Error saving requirement:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Create a request
app.post("/api/requests", async (req, res) => {
  try {
    const { foodType, quantity, location, organizationName } = req.body;

    if (!foodType || !quantity || !location || !organizationName) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newRequest = new Request(req.body);
    await newRequest.save();
    res.json({ message: "Request sent successfully!" });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Error creating request." });
  }
});

// Fetch requests
app.get("/api/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Error fetching requests." });
  }
});

// Mock /api/notifications endpoint to prevent 404 errors

// Update request status
app.post("/api/requests/:id/:action", async (req, res) => {
  const { id, action } = req.params;
  const status = action === "accept" ? "Accepted" : "Rejected";

  try {
    await Request.findByIdAndUpdate(id, { status });
    res.json({ message: `Request ${status.toLowerCase()} successfully.` });
  } catch (error) {
    console.error(`Error updating request status to ${status}:`, error);
    res.status(500).json({ error: `Error updating request status to ${status}.` });
  }
});


// Add a notification

// Add a notification
app.post("/api/notifications", async (req, res) => {
  try {
    const notification = new Notification({ message: req.body.message });
    await notification.save();
    res.status(201).json({ message: "Notification added successfully." });
  } catch (error) {
    console.error("Failed to add notification:", error);
    res.status(500).json({ error: "Failed to add notification." });
  }
});

// Get all notifications
app.get("/api/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
