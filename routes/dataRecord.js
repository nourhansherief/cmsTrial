const express = require("express");
const router = express.Router()

const DDLRecord = require("../models/DDLRecord")
const ddlRecordController = require("../Controllers/dataRecord.controller")
const commonMiddleware = require("../Common/commonMiddleware")

router.param("id" , commonMiddleware.checkIsIdValid(DDLRecord))

router.route("/").post(commonMiddleware.checkReqBody , ddlRecordController.createRecord)

router.route("/:id").delete(ddlRecordController.deleteRecord)

module.exports = router