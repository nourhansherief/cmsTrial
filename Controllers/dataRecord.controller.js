const DDLRecord = require("../models/DDLRecord");
const DDMContent = require("../models/DDMContent");
const DDLRecordSet = require("../models/DDLRecordSet");

const AppErrorHandler = require("../Common/commonErrorHandler");

exports.createRecord = async (req, res, next) => {
  const { DATA_, USERNAME, RECORDSETID } = req.body;

  if (!DATA_ || !RECORDSETID) {
    return next(new AppErrorHandler("Missing required fields", 404));
  }

  //Check If RECORDSETID EXSITED
  const recordSetId = await DDLRecordSet.find({ RECORDSETID });
  if (!recordSetId || recordSetId.length === 0) {
    return next(
      new AppErrorHandler(
        `There is no RECORDSETID with this value : ${RECORDSETID}`,
        404
      )
    );
  }

  // Create DDMCONTENT
  const ddmContentBody = { DATA_, USERNAME };
  const ddmContent = await DDMContent.create(ddmContentBody);

  // Create DDLRECORD
  const ddlRecordBody = {
    RECORDSETID,
    DDMSTORAGEID: ddmContent.CONTENTID,
    USERNAME,
  };
  const ddlRecord = await DDLRecord.create(ddlRecordBody);

  res.status(200).json({ message: "Record Created Successfully!" });
};

exports.deleteRecord = async (req, res, next) => {
  const { id } = req.params;
  const ddlRecord = await DDLRecord.find({ RECORDID: id });

  // DELETE DDMCONTENT
  await DDMContent.deleteOne({ CONTENTID: ddlRecord[0].DDMSTORAGEID });

  // DELETE DDLRECORD
  await DDLRecord.deleteOne({ RECORDID: id });

  res.status(200).json({ message: "Record Deleted Successfully!" });
};

exports.updateRecord = async (req, res , next) => {
  const { id } = req.params;
  const ddlRecord = await DDLRecord.find({ RECORDID: id });

  const { DATA_ } = req.body;
  if (!DATA_) {
    return next(new AppErrorHandler("Please Send Only DATA_ To Update", 404));
  }

  //Update DDMCONTENT
  await DDMContent.updateOne(
    { CONTENTID: ddlRecord[0].DDMSTORAGEID },
    { DATA_ }
  );

  res.status(200).json({ message: "Record Updated Successfully!" });
};
