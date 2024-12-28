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
  .connect(
    'mongodb+srv://dinushadeshan70:Wijewardana123@kindbite.ubptw.mongodb.net/?authSource=Wijewardana123&authMechanism=SCRAM-SHA-1',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// User Schema
const userSchema = new mongoose.Schema({
  businessName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  foodType: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/signup', async (req, res) => {
  const { businessName, email, password, location, foodType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ businessName, email, password: hashedPassword, location, foodType });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Sign-in successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
