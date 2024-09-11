const express = require("express");
const router = express.Router();
const ddmContentController = require("../Controllers/dataContent.controller");
const commonMiddleware = require("../Common/commonMiddleware");
const DDMContent = require("../models/DDMContent");

router.param("id", commonMiddleware.checkIsIdValid(DDMContent));


/**
 * @swagger
 * /data-content:
 *   get:
 *     tags:
 *     - DDMCONTENT
 *     summary: Get all Content
 *     description: Retrieve a list Of Contents, you can optionally send the page number and limit OR send only the page number and i will send to you by default a 10 results.
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
 *         description: Successful response with a list of Contents.
 *       400:
 *          description: Failed to fetch all Contents.
 */
router.route("/").get(ddmContentController.getAllDataContent);


/**
 * @swagger
 * /data-content/{CONTENTID}:
 *        get:
 *          tags:
 *          - DDMCONTENT
 *          summary: Get a Content
 *          description: Retrieve a Content
 *          parameters:
 *            - name : CONTENTID
 *              in : path
 *              required : true
 *              type : number
 *          responses:
 *              200:
 *                description: Successful response with a Content.
 *              400:
 *                description: Failed to fetch.
 *        patch:
 *            tags:
 *            - DDMCONTENT
 *            summary : Update The DATA_ Of Record
 *            description : Update the DATA_ only
 *            parameters :
 *             - name : CONTENTID
 *               DESCRIPTION : Please send the CONTENTID
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
 *                               type: object
 *                               required : true
 *            responses:
 *              200:
 *                description: Successful update the DATA_ of Content.
 *              400:
 *                description: Failed to Update.
 */
router
  .route("/:id")
  .get(ddmContentController.getSingleDataContent)
  .patch(commonMiddleware.checkReqBody, ddmContentController.updateDataContent);

module.exports = router;
