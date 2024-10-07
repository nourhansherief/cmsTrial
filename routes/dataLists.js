// routes/dataLists.js
const express = require('express');
const router = express.Router();
const commonMiddleware = require("../Common/commonMiddleware");
const dataListController = require("../Controllers/dataList.controller")
const DDLRecordSet = require("../models/DDLRecordSet")
const {catchAsyncHandler} = require('../Utilities/catchAsync')

router.param("id" , commonMiddleware.checkIsIdValid(DDLRecordSet))


/**
 * @swagger
 * /data-list:
 *   get:
 *     tags:
 *     - DataList
 *     summary: Get all DataList
 *     description: Retrieve a list Of RecordSet and it's Records and it's Content, you can optionally send the page number and limit OR send only the page number and i will send to you by default a 10 results.
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
 *         description: Successful response with a list of DataLst.
 *       400:
 *          description: Failed to fetch.
 */
router.route("/").get(catchAsyncHandler(dataListController.getAllDataList))


/**
 * @swagger
 * /data-list/{RECORDSETID}:
 *        delete:
 *          tags:
 *          - DataList
 *          summary : Delete a Datalist
 *          description : Delete a Record with a RECORDSETID
 *          parameters :
 *             - name : RECORDSETID
 *               DESCRIPTION : Please send the RECORDSETID
 *               in : path
 *               type : number
 *               required : true
 *          responses:
 *              200:
 *                description: Successful Deleted.
 *              400:
 *                description: Failed to Delete.
 */
router.route("/:id").delete(catchAsyncHandler(dataListController.deleteDataList))

module.exports = router;
