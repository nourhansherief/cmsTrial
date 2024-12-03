const express = require("express");
const router = express.Router();

const DDLRecord = require("../models/DDLRecord");
const ddlRecordController = require("../Controllers/dataRecord.controller");
const commonMiddleware = require("../Common/commonMiddleware");
const {catchAsyncHandler} = require('../Utilities/catchAsync')


router.param("id", commonMiddleware.checkIsIdValid(DDLRecord));


/**
 * @swagger
 * /data-record:
 *   post:
 *     tags:
 *     - DDLRECORD
 *     summary: Create a Record
 *     description: Create A Record with the RECORDSETID , USERNAME , DATA_
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
 *                RECORDSETID:
 *                  type: number
 *                  required: true
 *                DATA_:
 *                  type: object
 *                  required: true
 *     responses:
 *       200:
 *         description: Successful Created A RecordSets.
 *       400:
 *          description: Failed to create RecordSets.
 */
router.route("/").post(catchAsyncHandler(ddlRecordController.createRecord));



/**
 * @swagger
 * /data-record/{RECORDID}:
 *        delete:
 *          tags:
 *          - DDLRECORD
 *          summary : Delete a Record
 *          description : Delete a Record with a RECORDID
 *          parameters :
 *             - name : RECORDID
 *               DESCRIPTION : Please send the RECORDID
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
 *            - DDLRECORD
 *            summary : Update The Data Of Record
 *            description : Update the DATA_ only
 *            parameters :
 *             - name : RECORDID
 *               DESCRIPTION : Please send the RECORDID
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
 *                           DATA_:
 *                              type: object
 *                              required: true
 *            responses:
 *              200:
 *                description: Successful update the DATA_ of Record.
 *              400:
 *                description: Failed to Update.
 */
router
  .route("/:id")
  .get(catchAsyncHandler(ddlRecordController.getRecord))
  .delete(catchAsyncHandler(ddlRecordController.deleteRecord))
  .patch(catchAsyncHandler(ddlRecordController.updateRecord));

module.exports = router;
