const express = require("express");
const cors = require("cors");
const app = express();

const swaggerSpec = require("./config/swaggerConfig");
const swaggerUi = require("swagger-ui-express");

const dataDefinitionsRoutes = require("./routes/dataDefinitions");
const dataListRoutes = require("./routes/dataLists");
const ddlRecordSetRoutes = require("./routes/dataRecordSet");
const ddmContentRoutes = require("./routes/dataContent");
const ddlRecordRoutes = require("./routes/dataRecord");
const AppErrorHandler = require("./Common/commonErrorHandler");
const commonMiddleware = require("./Common/commonMiddleware");

app.use(express.json());
app.use(cors());

// Allow Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware for Checking if Req Body is Empty
app.use(commonMiddleware.checkReqBody);

app.use("/data-definitions", dataDefinitionsRoutes);
app.use("/data-record-set", ddlRecordSetRoutes);
app.use("/data-content", ddmContentRoutes);
app.use("/data-record", ddlRecordRoutes);
app.use("/data-list", dataListRoutes);

// Swagger Middleware For API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all("*", (req, res, next) => {
  //res.status(404).json({message : `This Route ${req.queryParam} Does Not Exist`});
  // const err = new Error(`This Route ${req.queryParam} Does Not Exist`)
  // err.statusCode = 404
  // err.status = 'fail'

  next(new AppErrorHandler(`This Route ${req.url} Does Not Exist`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err.stack);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = { app };
