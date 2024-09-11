const express = require("express");
const router = express.Router();
const DataDefinition = require("../models/DataDefinition");
const dataDefinitionControllers = require("../Controllers/dataDefinition.controller");
const commonMiddleware = require("../Common/commonMiddleware");

router.use(commonMiddleware.checkReqBody)
router.param("id", commonMiddleware.checkIsIdValid(DataDefinition));



/**
 * @swagger
 * /data-definitions:
 *   get:
 *     tags:
 *     - DDMSTRUCTURES
 *     summary: Get all Data Definition
 *     description: Retrieve a list Of DataDefinition, you can optionally send the page number and limit OR send only the page number and i will send to you by default a 10 results.
 *     parameters:
 *            - name : page
 *              in : query
 *              required : false
 *              type : number
 *            - name : limit
 *              in : query
 *              required : false
 *              type : number
 *     responses:
 *       200:
 *         description: Successful response with a list of Definitions.
 *       400:
 *          description: Failed to fetch all Definitions.
 *   post:
 *     tags:
 *     - DDMSTRUCTURES
 *     summary: Create a Data Definition
 *     description: Create A RecordSet with the USERNAME , NAME , DEFINITION
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                USERNAME:
 *                  type: string
 *                  required: true
 *                NAME:
 *                  type: string
 *                  required: true
 *                DEFINITION:
 *                  type: object
 *                  required: true
 *     responses:
 *       200:
 *         description: Successful Created A Data Definition.
 *       400:
 *          description: Failed to create Data Definition.
 */
router
  .route("/")
  .post(dataDefinitionControllers.createDataDefinitions)
  .get(dataDefinitionControllers.getAllDataDefinitions);


/**
 * @swagger
 * /data-definitions/{STRUCTUREID}:
 *        get:
 *          tags:
 *          - DDMSTRUCTURES
 *          summary: Get all RecordSets With it's DataDefinition
 *          description: Retrieve a list Of RecordSets and DataDefinition, you can optionally send the page number and limit OR send only the page number and i will send to you by default a 10 results.
 *          parameters:
 *            - name : STRUCTUREID
 *              in : path
 *              required : true
 *              type : number
 *          responses:
 *              200:
 *                description: Successful response with a DataDefinition.
 *              400:
 *                description: Failed to fetch.
 *        delete:
 *          tags:
 *          - DDMSTRUCTURES
 *          summary : Delete a Record
 *          description : Delete a Record with a RECORDID
 *          parameters :
 *             - name : STRUCTUREID
 *               DESCRIPTION : Please send the STRUCTUREID
 *               in : path
 *               type : number
 *               required : true
 *          responses:
 *              200:
 *                description: Successful Deleted.
 *              400:
 *                description: Failed to Delete.
 *        patch:
 *            tags:
 *            - DDMSTRUCTURES
 *            summary : Update The Definition and Name Of Record
 *            description : Update the DEFINITION and NAME only
 *            parameters :
 *             - name : STRUCTUREID
 *               DESCRIPTION : Please send the STRUCTUREID
 *               in : path
 *               type : number
 *               required : true
 *            requestBody :
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                           NAME:
 *                              type: string
 *                              required: true
 *                           DEFINITION:
 *                               type: object
 *                               required : true
 *            responses:
 *              200:
 *                description: Successful update the DEFINITION and NAME of DataDefinition.
 *              400:
 *                description: Failed to Update.
 */
router
  .route("/:id")
  .get(dataDefinitionControllers.getSingleDataDefinition)
  .delete(dataDefinitionControllers.deleteDataDefinition)
  .patch(dataDefinitionControllers.updateDataDefinition);

module.exports = router;
