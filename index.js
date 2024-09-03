const express = require("express");
const app = express();

const dataDefinitionsRoutes = require("./routes/dataDefinitions");
const dataListsRoutes = require("./routes/dataLists");
const ddlRecordSetRoutes = require('./routes/dataRecordSet')

app.use(express.json())

app.use("/data-definitions", dataDefinitionsRoutes);
app.use("/data-record-set" , ddlRecordSetRoutes)
//app.use("/data-lists", dataListsRoutes);

module.exports = { app };
