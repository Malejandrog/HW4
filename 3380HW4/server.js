import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // Built-in Express JSON parser
app.use(cors()); // Allow cross-origin requests

app.get('/', (req, res) => {
  res.send('Hello, World! The server is working.');
});

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/favicon.ico', (req, res) => {
  res.status(204); // No Content
});

// PostgreSQL pool configuration
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'dbs22',
  password: 'postgres',
  port: 5432,
});

// Test the PostgreSQL connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Define SQL file paths
const createSQL = path.join(__dirname, 'create.sql');
const doTransaction = path.join(__dirname, 'transactions.sql');

// Function to run the SQL file to create tables
const createTables = () => {
  fs.readFile(createSQL, 'utf8', (err, sql) => {
    if (err) {
      console.error('Error reading SQL file for table creation:', err);
      return;
    }

    // Execute the SQL statements from the file
    pool.query(sql)
      .then(() => {
        console.log('Tables created successfully!');
      })
      .catch((err) => {
        console.error('Error executing SQL for table creation:', err);
      });
  });
};

// Automatically create tables when the server starts
createTables();

// Endpoint to start a custom function
app.post('/start-function', (req, res) => {
  console.log('Function started by frontend!');

  // Read the SQL file for transactions
  fs.readFile(doTransaction, 'utf8', (err, sql) => {
    if (err) {
      console.error('Error reading SQL file for transactions:', err);
      return res.status(500).send({ message: 'Error reading SQL file.' });
    }

    // Execute the SQL statements from the file
    pool.query(sql)
      .then(() => {
        console.log('Transactions executed successfully!');
        res.status(200).send({ message: 'Transactions executed successfully!' });
      })
      .catch((err) => {
        console.error('Error executing SQL transactions:', err);
        res.status(500).send({ message: 'Error executing SQL transactions.' });
      });
  });
});

// Login endpoint to authenticate users
app.post('/login-function', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Query to check if the user exists with the provided credentials
    const result = await pool.query(
      'SELECT * FROM Customer WHERE LOWER(CustomerEmail) = LOWER($1) AND CustomerPassword = $2',
      [email, password]
    );

    // If a match is found, return a success response
    if (result.rows.length > 0) {
      res.status(200).json({ success: true, message: 'Login successful!' });
    } else {
      // If no match is found, return an unauthorized error
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Error during login query:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
