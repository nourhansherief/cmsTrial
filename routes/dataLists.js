// routes/dataLists.js
const express = require('express');
const router = express.Router();
const commonMiddleware = require("../Common/commonMiddleware");
const dataListController = require("../Controllers/dataList.controller")
const DDLRecordSet = require("../models/DDLRecordSet")

router.param("id" , commonMiddleware.checkIsIdValid(DDLRecordSet))

router.route("/").get(dataListController.getAllDataList)

router.route("/:id").delete(dataListController.deleteDataList)

module.exports = router;
