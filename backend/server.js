require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js to use Google public DNS to bypass ISP blocking of MongoDB queries
dns.setServers(['8.8.8.8', '8.8.4.4']);
const cors = require('cors');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolioDB';

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB (portfolioDB)'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
// POST /api/contact - Receive contact form data
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Basic Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Please provide name, email, and message.' });
        }

        // Save to database
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: messages.join(', ') });
        }
        console.error('Save Error:', err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
