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

// Global variables to store logged-in user information
let loggedInCustomerID = null;
let loggedInCustomerEmail = null;
let loggedInCustomerAddress = null;

// Login endpoint to authenticate users
app.post('/login-function', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Query to check if the user exists with the provided credentials
    const result = await pool.query(
      'SELECT CustomerID, CustomerEmail, CustomerAddress FROM Customer WHERE LOWER(CustomerEmail) = LOWER($1) AND CustomerPassword = $2',
      [email, password]
    );

    console.log(result.rows[0].customeremail);

    // If a match is found, return a success response
    if (result.rows.length > 0) {
      // Extract the user data
      const { CustomerID, CustomerEmail, CustomerAddress } = result.rows[0];

      // Store the logged-in user info in global variables
      loggedInCustomerID = result.rows[0].customerid;
      console.log('customerID:', loggedInCustomerID);
      loggedInCustomerEmail = result.rows[0].customeremail;
      console.log('customerEmail:', loggedInCustomerEmail);
      loggedInCustomerAddress = result.rows[0].customeraddress;
      console.log('customerAddress:', loggedInCustomerAddress);

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



app.post('/place-order', async (req, res) => {
  const { count, location, paymentMethod, cardNumber, ccv, expDate, tip } = req.body;

// Retrieve the global variables
  const customerID = loggedInCustomerID;
  const customerEmail = loggedInCustomerEmail;
  const customerAddress = loggedInCustomerAddress;

  // Ensure the user is logged in
  console.log('Test Message 1');

  if (!customerEmail) {
    console.log('Test Message 2');
    return res.status(400).json({ message: 'User not logged in.' });
  }

  console.log('Test Message 3');

  // Ensure the necessary fields are present
  if (!count || !location || !paymentMethod || !cardNumber || !ccv || !expDate || !tip) {
    console.log('Test Message 4');
    return res.status(401).json({ message: 'Field Missing.' });
  }

  console.log('Test Message 5');

  try {
    const totalAmount = parseFloat((count * 1.0825).toFixed(2));
    const taxAmount = parseFloat((count * 0.0825).toFixed(2));

    // Insert the order into the database
    await pool.query(
      `INSERT INTO OrderInfo (LocationID, CustomerID, OrderDate, TotalAmount, TaxAmount, TipAmount, PaymentMethod) 
       VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6)`,
      [location, customerID, totalAmount, taxAmount, tip, paymentMethod]
    );

    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
