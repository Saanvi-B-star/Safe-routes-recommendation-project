// connecting the required dependencies to the backend
// import express from "express";
// import mysql from "mysql2";
// import cors from "cors";
// import bodyParser from "body-parser";
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

// express setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// mysql database connection
const LoginDB = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"gun@SQL@25", // provide your own password
    database:"SaferiLogin",
});

// mysql connection check
LoginDB.connect((err) =>{
    if(err)
    {
        console.log("Database connection error: ",err);
        process.exit(1);
    }
    else 
    {
        console.log("Connected to Mysql Database");
    }
});

// registering user
// app.post sends a request of data to the url /login to store the data in the database 
// request : contains the data that is send from the client (eg : user data)
// response : object that allows the serveer to send the a response back to the client
app.post("/login",async (request,response) => {
    const {name , email , age , gender , emergencyContact} = request.body; // to extract the user details from the frontend form

    // firing and checking the sql query
    LoginDB.query(
        "INSERT INTO LoginData (Name , Email , Age , Gender , Emergency_Contact) VALUES (? , ? , ? , ? , ?)",
        [name , email , age , gender , emergencyContact],
        (err, result) => {
            if(err)
            {
                console.log("Error : "+err);
                return response.status(500).json({error:err});
            }
            console.log("Successful login");
            response.status(201).json({message: "User registered successfully"});
        }
    );
});

//starting the server
app.listen(5000, ()=>{
    console.log("Server running  on port 5000");
});