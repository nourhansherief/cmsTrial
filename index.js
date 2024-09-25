const express = require("express");
const app = express();

const dataDefinitionsRoutes = require("./routes/dataDefinitions");
const dataListRoutes = require("./routes/dataLists");
const ddlRecordSetRoutes = require('./routes/dataRecordSet')
const ddmContentRoutes = require("./routes/dataContent")
const ddlRecordRoutes = require("./routes/dataRecord");
const AppErrorHandler = require("./Common/commonErrorHandler");

app.use(express.json())

app.use("/data-definitions", dataDefinitionsRoutes);
app.use("/data-record-set" , ddlRecordSetRoutes);
app.use("/data-content" , ddmContentRoutes)
app.use("/data-record" , ddlRecordRoutes)
app.use("/data-list", dataListRoutes);

app.all('*' , (req , res , next) => {
    //res.status(404).json({message : `This Route ${req.queryParam} Does Not Exist`});
    // const err = new Error(`This Route ${req.queryParam} Does Not Exist`)
    // err.statusCode = 404
    // err.status = 'fail'
    
    next(new AppErrorHandler(`This Route ${req.queryParam} Does Not Exist` , 404))
})

app.use((err , req , res , next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status : err.status,
        message : err.message
    })
})

module.exports = { app };
