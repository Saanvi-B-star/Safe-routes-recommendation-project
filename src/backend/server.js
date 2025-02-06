const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post("/send-sms", async (req, res) => {
  const { message } = req.body;
  const msgOptions = {
    from: process.env.TWILIO_FROM_NUMBER,
    to: process.env.TO_NUMBERS.split(","), // Ensure it's in E.164 format (+91xxxxxxxxxx)
    body: message,
  };

  try {
    const response = await client.messages.create(msgOptions);
    res.status(200).json({ success: true, sid: response.sid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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

app.post("/signup", async (req, res) => {
  try {
      const { name, email, age, gender, emergencyContact } = req.body;
      const connection = await pool.getConnection();

      // Check if email already exists
      const [rows] = await connection.query('SELECT * FROM LoginData WHERE Email = ?', [email]);

      if (rows.length > 0) {
          connection.release();
          return res.status(400).json({ error: "Email already exists. Please login instead." });
      }

      // Insert new user
      await connection.query(
          'INSERT INTO LoginData (Name, Email, Age, Gender, Emergency_Contact) VALUES (?, ?, ?, ?, ?)',
          [name, email, age, gender, emergencyContact]
      );

      connection.release();
      console.log("User registered successfully");
      res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
      console.error("Error inserting user:", err);
      res.status(500).json({ error: err.message });
  }
});

// ✅ **LOGIN Route (Check if User Exists)**
app.post("/login", async (req, res) => {
  try {
      const { email , password} = req.body;
      const connection = await pool.getConnection();

      // Check if user exists
      const [users] = await connection.query('SELECT * FROM LoginData WHERE Email = ?', [email]);

      connection.release();

      if (users.length === 0) {
          return res.status(404).json({ error: "Email not found. Please sign up first." });
      }

        res.json({ message: "Login successful" });

  } catch (err) {
      console.error("Error checking login:", err);
      res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// app.post("/login", async (request, response) => {
//     try {
//         const {name, email, age, gender, emergencyContact} = request.body;
//         const connection = await pool.getConnection();
        
//         await connection.query(
//             'INSERT INTO LoginData (Name, Email, Age, Gender, Emergency_Contact) VALUES (?, ?, ?, ?, ?)',
//             [name, email, age, gender, emergencyContact]
//         );
        
//         connection.release();
//         console.log("User registered successfully");
//         response.status(201).json({ message: "User registered successfully" });
//     } catch (err) {
//         console.error("Error inserting user:", err);
//         response.status(500).json({ error: err.message });
//     }
// });