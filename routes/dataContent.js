const express = require("express");
const router = express.Router();
const ddmContentController = require("../Controllers/dataContent.controller");
const commonMiddleware = require("../Common/commonMiddleware");
const DDMContent = require("../models/DDMContent");

router.param("id", commonMiddleware.checkIsIdValid(DDMContent));

router.route("/").get(ddmContentController.getAllDataContent);

router
  .route("/:id")
  .get(ddmContentController.getSingleDataContent)
  .patch(commonMiddleware.checkReqBody, ddmContentController.updateDataContent);

module.exports = router;
