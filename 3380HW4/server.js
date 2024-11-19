// Import required modules
const express = require('express');
const { Pool } = require('pg');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

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