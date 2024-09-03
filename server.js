// server.js
const express = require("express");
const {app} = require('./index')
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDb } = require("./config/dbConnection");

dotenv.config({ path: "./.env" });

// app.use(helmet());
app.use(cors());

// Connect to MongoDB
connectToDb();

// listenting to server
app.listen(process.env.PORT, () => {
  console.log(`Server is Running!`);
});
