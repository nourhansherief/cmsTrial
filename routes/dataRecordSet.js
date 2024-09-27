const express = require("express");
const router = express.Router();
const ddlRecordSetController = require("../Controllers/dataRecordSet.controller");
const commonMiddleware = require("../Common/commonMiddleware");
const DDLRecordSet = require("../models/DDLRecordSet");
const {catchAsyncHandler} = require('../Utilities/catchAsync')


router.use(commonMiddleware.checkReqBody)
router.param("id", commonMiddleware.checkIsIdValid(DDLRecordSet));

/**
 * @swagger
 * /data-record-set:
 *   get:
 *     tags:
 *     - DDLRECORDSET
 *     summary: Get all RecordSets
 *     description: Retrieve a list Of RecordSets.
 *     responses:
 *       200:
 *         description: Successful response with a list of RecordSets.
 *       400:
 *          description: Failed to fetch all RecordSets.
 *   post:
 *     tags:
 *     - DDLRECORDSET
 *     summary: Create a RecordSet
 *     description: Create A RecordSet with the USERNAME , NAME , DDMSTRUCTUREID
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
 *                DDMSTRUCTUREID:
 *                  type: number
 *                  required: true
 *     responses:
 *       200:
 *         description: Successful Created A RecordSets.
 *       400:
 *          description: Failed to create RecordSets.
 */

router
  .route("/")
  .get(ddlRecordSetController.getAllRecordSet)
  .post(catchAsyncHandler(ddlRecordSetController.createRecordSet));


/**
 * @swagger
 * /data-record-set/datadefinition:
 *   get:
 *     tags:
 *     - DDLRECORDSET
 *     summary: Get all RecordSets With it's DataDefinition
 *     description: Retrieve a list Of RecordSets and DataDefinition, you can optionally send the page number and limit OR send only the page number and i will send to you by default a 10 results.
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
 *         description: Successful response with a list of RecordSets.
 *       400:
 *          description: Failed to fetch all RecordSets.
 */

router
  .route("/datadefinition")
  .get(ddlRecordSetController.getAllRecordSetWithDataDefinition);


/**
 * @swagger
 * /data-record-set/{RECORDSETID}:
 *        get:
 *          tags:
 *          - DDLRECORDSET
 *          summary : Get Single RecordSet
 *          description : retrieve a single recordset with a RECORDSETID
 *          parameters :
 *             - name : RECORDSETID
 *               DESCRIPTION : Please send the RECORDSETID
 *               in : path
 *               type : number
 *               required : true
 *          responses:
 *              200:
 *                description: Successful response with a RecordSets.
 *              400:
 *                description: Failed to fetch a RecordSets.
 *        patch:
 *            tags:
 *            - DDLRECORDSET
 *            summary : Update The Name Of RecordSet
 *            description : Update the NAME only
 *            parameters :
 *             - name : RECORDSETID
 *               DESCRIPTION : Please send the RECORDSETID
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
 *            responses:
 *              200:
 *                description: Successful update the name of RecordSets.
 *              400:
 *                description: Failed to update.
 */
router
  .route("/:id")
  .get(ddlRecordSetController.getSingleRecordSet)
  .patch(commonMiddleware.checkReqBody, ddlRecordSetController.updateName);

module.exports = router;
