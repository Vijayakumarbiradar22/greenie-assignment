const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose.set('strictQuery', false);

// MongoDB Connection
mongoose.connect('mongodb+srv://vijaya20cs104:J0o6VoWWIH7hVVlq@cluster0.8cp6smf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
});

// Define a User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  userId: String,
});

const User = mongoose.model('User', userSchema);

// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password, userId } = req.body;

    // Save user data to the database
    const user = new User({ username, email, phone, password, userId });
    await user.save();

    res.json({ success: true, userId: user.userId });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    res.json({ success: true, userId: user.userId });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

app.get('/allusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
