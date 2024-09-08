const express = require("express");
const app = express();

const dataDefinitionsRoutes = require("./routes/dataDefinitions");
const dataListsRoutes = require("./routes/dataLists");
const ddlRecordSetRoutes = require('./routes/dataRecordSet')
const ddmContentRoutes = require("./routes/dataContent")
const ddlRecordRoutes = require("./routes/dataRecord")

app.use(express.json())

app.use("/data-definitions", dataDefinitionsRoutes);
app.use("/data-record-set" , ddlRecordSetRoutes);
app.use("/data-content" , ddmContentRoutes)
app.use("/data-record" , ddlRecordRoutes)
//app.use("/data-lists", dataListsRoutes);

module.exports = { app };
