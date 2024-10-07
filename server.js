// server.js
const express = require("express");
const { app } = require("./index");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDb } = require("./config/dbConnection");

dotenv.config({ path: "./.env" });

// Catch UnCaught Exception
process.on("uncaughtException", (err) => {
  console.log("UnCaught Exception error");
  console.log(err.name, err.message);
  process.exit(1);
});

// app.use(helmet());
app.use(cors());

// Connect to MongoDB
connectToDb();

// listenting to server
app.listen(process.env.PORT, () => {
  console.log(`Server is Running!`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection at:');
  console.log(err.name , err.message)
  process.exit(1);
});
