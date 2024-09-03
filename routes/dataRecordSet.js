const express = require('express')
const router = express.Router()
const ddlRecordSetController = require('../Controllers/dataRecordSet.controller')

router.route("/").get(ddlRecordSetController.getAllDataRecordSet)

module.exports = router