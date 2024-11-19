// Import required modules
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// PostgreSQL pool configuration
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'dbs22',
  password: 'postgres',
  port: 5432,
});

// Test connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
