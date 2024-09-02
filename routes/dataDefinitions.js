const express = require("express");
const router = express.Router();
const DataDefinition = require("../models/DataDefinition");
const dataDefinitionControllers = require("../Controllers/dataDefinition.controller");
const commonMiddleware = require("../Common/commonMiddleware");

router.param("id", commonMiddleware.checkIsIdValid(DataDefinition));

router
  .route("/")
  .post(dataDefinitionControllers.createDataDefinitions)
  .get(dataDefinitionControllers.getAllDataDefinitions);

router
  .route("/:id")
  .get(dataDefinitionControllers.getSingleDataDefinition)
  .delete(dataDefinitionControllers.deleteDataDefinition)
  .put(dataDefinitionControllers.updateDataDefinition);

module.exports = router;
