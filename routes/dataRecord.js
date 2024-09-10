const express = require("express");
const router = express.Router();

const DDLRecord = require("../models/DDLRecord");
const ddlRecordController = require("../Controllers/dataRecord.controller");
const commonMiddleware = require("../Common/commonMiddleware");

router.use(commonMiddleware.checkReqBody);

router.param("id", commonMiddleware.checkIsIdValid(DDLRecord));

router.route("/").post(ddlRecordController.createRecord);

router
  .route("/:id")
  .delete(ddlRecordController.deleteRecord)
  .patch(ddlRecordController.updateRecord);

module.exports = router;
