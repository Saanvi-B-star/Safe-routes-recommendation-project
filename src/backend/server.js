const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,  
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,  
    ssl: { rejectUnauthorized: false }
  });

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to Aiven MySQL database');
    
    // Create table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS LoginData (
        Name TEXT NOT NULL,
        Email VARCHAR(255) NOT NULL PRIMARY KEY,
        Age INT CHECK(Age>0) NOT NULL,
        Gender TEXT NOT NULL,
        Emergency_Contact TEXT NOT NULL
      )
    `);
    
    connection.release();
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

testConnection();

app.post("/login", async (request, response) => {
    try {
        const {name, email, age, gender, emergencyContact} = request.body;
        const connection = await pool.getConnection();
        
        await connection.query(
            'INSERT INTO LoginData (Name, Email, Age, Gender, Emergency_Contact) VALUES (?, ?, ?, ?, ?)',
            [name, email, age, gender, emergencyContact]
        );
        
        connection.release();
        console.log("User registered successfully");
        response.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error inserting user:", err);
        response.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});