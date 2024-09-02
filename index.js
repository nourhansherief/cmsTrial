const express = require("express");
const app = express();

const dataDefinitionsRoutes = require("./routes/dataDefinitions");
const dataListsRoutes = require("./routes/dataLists");

app.use("/data-definitions", dataDefinitionsRoutes);
app.use("/data-lists", dataListsRoutes);

module.exports = { app };
