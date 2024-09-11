// server.js
const express = require("express");
const {app} = require('./index')
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDb } = require("./config/dbConnection");
const swaggerSpec = require("./config/swaggerConfig");
const swaggerUi = require('swagger-ui-express');

dotenv.config({ path: "./.env" });

// app.use(helmet());
app.use(cors());

// Connect to MongoDB
connectToDb();

// Swagger Middleware For API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// listenting to server
app.listen(process.env.PORT, () => {
  console.log(`Server is Running!`);
});
