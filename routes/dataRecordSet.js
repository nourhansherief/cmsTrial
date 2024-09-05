const express = require("express");
const router = express.Router();
const ddlRecordSetController = require("../Controllers/dataRecordSet.controller");
const commonMiddleware = require("../Common/commonMiddleware");
const DDLRecordSet = require("../models/DDLRecordSet");

router.param("id", commonMiddleware.checkIsIdValid(DDLRecordSet));

router
  .route("/")
  .get(ddlRecordSetController.getAllRecordSet)
  .post(commonMiddleware.checkReqBody, ddlRecordSetController.createRecordSet);

router
  .route("/datadefinition")
  .get(ddlRecordSetController.getAllRecordSetWithDataDefinition);

router
  .route("/:id")
  .get(ddlRecordSetController.getSingleRecordSet)
  .patch(commonMiddleware.checkReqBody, ddlRecordSetController.updateName);

module.exports = router;
