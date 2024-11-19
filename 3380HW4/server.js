// Import required modules
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
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({origin: 'http://127.0.0.1:5173',}));

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

// Define SQL file paths
const createSQL = path.join(__dirname, 'create.sql');
const testDBSQL = path.join(__dirname, 'populate_tables.sql');

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

// Run the SQL script automatically when the server starts
createTables();

// API route to test database functionality by populating tables
app.post('http://127.0.0.1:5000/api/test-db', async (req, res) => {
  try {
    // Read the SQL file using Promise-based syntax
    const sql = await fs.promises.readFile(testDBSQL, 'utf8');

    // Execute the SQL statements from the file
    await pool.query(sql);

    console.log('Tables populated successfully!');
    return res.status(200).send('Database populated successfully');
  } catch (error) {
    // Log and handle errors
    if (error.code === 'ENOENT') {
      console.error('SQL file not found:', error);
      return res.status(500).send('SQL file not found');
    } else if (error instanceof pool.QueryError) {
      console.error('Error executing SQL:', error);
      return res.status(500).send('Error executing SQL');
    } else {
      console.error('Unexpected error:', error);
      return res.status(500).send('Unexpected error occurred');
    }
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});