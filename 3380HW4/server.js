// Import required modules
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

  const sqlFilePath = path.join(__dirname, 'create.sql');

  // Function to run the SQL file
  const createTables = () => {
    fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
      if (err) {
        console.error('Error reading SQL file:', err);
        return;
      }
  
      // Execute the SQL statements from the file
      pool.query(sql)
        .then(() => {
          console.log('Tables created successfully!');
        })
        .catch((err) => {
          console.error('Error executing SQL:', err);
        });
    });
  };
  
  // Run the SQL script automatically when the server starts
  createTables();

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
