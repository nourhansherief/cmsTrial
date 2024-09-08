const DDLRecord = require("../models/DDLRecord");
const DDMContent = require("../models/DDMContent");
const DDLRecordSet = require("../models/DDLRecordSet");

exports.createRecord = async (req, res) => {
  try {
    const { DATA_, USERNAME, RECORDSETID } = req.body;

    if (!DATA_ || !RECORDSETID) {
      throw new Error("Missing required fields");
    }

    //Check If RECORDSETID EXSITED
    const recordSetId = await DDLRecordSet.find({ RECORDSETID });
    if (!recordSetId || recordSetId.length === 0) {
      throw new Error(
        `There is no RECORDSETID with this value : ${RECORDSETID}`
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

    res.status(200).json({ message: "Record created successfully!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const ddlRecord = await DDLRecord.find({ RECORDID: id });

    // DELETE DDMCONTENT
    await DDMContent.deleteOne({ CONTENTID: ddlRecord[0].DDMSTORAGEID });

    // DELETE DDLRECORD
    await DDLRecord.deleteOne({ RECORDID: id });

    res.status(200).json({ message: "Record deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
