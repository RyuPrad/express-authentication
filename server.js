const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
