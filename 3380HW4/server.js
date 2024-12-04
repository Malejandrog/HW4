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
let loggedInCustomerName = null;

// Login endpoint to authenticate users
app.post('/login-function', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Query to check if the user exists with the provided credentials
    const result = await pool.query(
      'SELECT CustomerID, CustomerEmail, CustomerAddress, CustomerName FROM Customer WHERE LOWER(CustomerEmail) = LOWER($1) AND CustomerPassword = $2',
      [email, password]
    );

    // If a match is found, return a success response
    if (result.rows.length > 0) {
      // Extract the user data
      const { CustomerID, CustomerEmail, CustomerAddress, CustomerName } = result.rows[0];

      // Store the logged-in user info in global variables
      loggedInCustomerID = result.rows[0].customerid;
      console.log('customerID:', loggedInCustomerID);

      loggedInCustomerEmail = result.rows[0].customeremail;
      console.log('customerEmail:', loggedInCustomerEmail);


      loggedInCustomerAddress = result.rows[0].customeraddress;
      console.log('customerAddress:', loggedInCustomerAddress);


      loggedInCustomerName = result.rows[0].customername;
      console.log('customerName:', loggedInCustomerName);

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
  const { count, location, paymentMethod, cardNumber, ccv, expDate, tip, items } = req.body;

// Retrieve the global variables
  const customerID = loggedInCustomerID;
  const customerEmail = loggedInCustomerEmail;
  const customerAddress = loggedInCustomerAddress;
  const customerName = loggedInCustomerName;
  const customerBank = LoggedInCustomerAccountNumber;
  const tipNumber = parseFloat(tip);

  // Ensure the user is logged in
  console.log('Test Message 1');

  if (!customerEmail) {
    console.log('Test Message 2');
    return res.status(400).json({ message: 'User not logged in.' });
  }

  console.log('Test Message 3');

  // Ensure the necessary fields are present
  if (!count || !location || !paymentMethod || !cardNumber || !ccv || !expDate || !tip || !items || !Array.isArray(items)) {
    console.log('Test Message 4');
    return res.status(401).json({ message: 'Field Missing.' });
  }

  console.log('Test Message 5');

  try {
    const totalAmount = parseFloat((count * 1.0825 + tipNumber).toFixed(2));
    const taxAmount = parseFloat((count * 0.0825).toFixed(2));

    // Insert the order into the database
    const orderResult = await pool.query(
      `INSERT INTO OrderInfo (LocationID, CustomerID, OrderDate, TotalAmount, TaxAmount, TipAmount, PaymentMethod) 
       VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6) RETURNING OrderID`,
      [location, customerID, totalAmount, taxAmount, tipNumber, paymentMethod]
    );
    const orderID = orderResult.rows[0].orderid;
    console.log('OrderInfo Updated');
    
    const balanceResult = await pool.query(
      `SELECT Balance FROM BankAccount WHERE CustomerID = $1`,
      [customerID]
    );
    
    // Check if a balance was retrieved
    if (balanceResult.rows.length > 0) {
      // Extract the balance from the result
      let customerBalance = parseFloat(balanceResult.rows[0].balance); // Ensure balance is a float

      // Check if the customer has sufficient funds
      if (customerBalance < totalAmount) {
        throw new Error('Insufficient funds.');
      }

      // Deduct the total amount from the balance and fix to 2 decimal points
      customerBalance -= totalAmount;
      customerBalance = parseFloat(customerBalance.toFixed(2));

      // Update the balance in the database
      await pool.query(
        `UPDATE BankAccount
        SET Balance = $1
        WHERE CustomerID = $2`,
        [customerBalance, customerID]
      );
    } else {
      throw new Error('Customer balance not found.');
    }

    await pool.query(
      `INSERT INTO PaymentInfo (OrderID, CustomerID, CreditCardNumber, CCV, ExpirationDate, BillingAddress)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [orderID, customerID, cardNumber, ccv, expDate, customerAddress]
    );
    console.log('PaymentInfo Updated');

    // Insert transaction information
    await pool.query(
      `INSERT INTO TransactionInfo (OrderID, AccountNumber, LocationID, TransactionDate, PaymentAmount)
       VALUES ($1, $2, $3, CURRENT_DATE, $4)`,
      [orderID, customerBank, location, totalAmount]
    );
    console.log('TransactionInfo Updated');

    // Insert each item into the OrderHistory table
    const client = await pool.connect(); // Begin transaction
    try {
      await client.query('BEGIN');

      for (const item of items) {
        console.log(item)
        const { itemid, quantity } = item;
        if (!itemid || !quantity) {
          console.log(itemid, quantity)
          throw new Error('Invalid item format.');
        }

        await client.query(
          `INSERT INTO OrderHistory (OrderID, ItemID, ItemQuantity) 
           VALUES ($1, $2, $3)`,
          [orderID, itemid, quantity]
        );
      }

      await client.query('COMMIT');
      console.log('OrderHistory Updated');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

let LoggedInCustomerAccountNumber = null;

app.post('/create-account',  async (req, res) => {
  console.log('Creating Account')
  const { name, address, city, state, phone, email, password, hasloyaltycard } = req.body;
  try {

    // Insert the account details into the database
    const result = await pool.query(
      `INSERT INTO Customer (CustomerName, CustomerAddress, CustomerCity, CustomerState, CustomerPhoneNumber, CustomerEmail, CustomerPassword, HasLoyaltyCard) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING CustomerID`,
      [name, address, city, state, phone, email, password, hasloyaltycard]
    );
    const customerID2 = result.rows[0].customerid;
    console.log('Customer Tuple Created');

    // Generates 10 random digits to use as an account number
    let Accnumber = '';
    for (let i = 0; i < 10; i++) {
      Accnumber += Math.floor(Math.random() * 10); 
    }

    LoggedInCustomerAccountNumber = Accnumber;

    let Balnumber = '';
    for (let i = 0; i < 4; i++) {
      Balnumber += Math.floor(Math.random() * 10);
    }

    const accountType = Math.random() < 0.5 ? 'Checking' : 'Savings';

    await pool.query(
      `INSERT INTO BankAccount (CustomerID, AccountNumber, AccountHolderName, AccountType, Balance) 
       VALUES ($1, $2, $3, $4, $5)`,
      [customerID2, Accnumber, name, accountType, Balnumber]
    );
    console.log('BankAccount Tuple Created');


    res.status(200).json({ success: true, message: 'Account created successfully!' });
  } catch (error) {
    console.error('Error creating account:', error);
    console.log('Inserting into Customer table:', { name, address, city, state, phone, email, password, hasloyaltycard });
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
