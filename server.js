// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const dataDefinitionsRoutes = require('./routes/dataDefinitions');
const dataListsRoutes = require('./routes/dataLists');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
// app.use(helmet());
app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb://nour:nour@localhost:27017/data-definition-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use Routes
app.use('/data-definitions', dataDefinitionsRoutes);
app.use('/data-lists', dataListsRoutes);

// listenting to server 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
