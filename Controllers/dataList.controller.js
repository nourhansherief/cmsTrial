const { startSession } = require("mongoose");

// Models (Collections)
const DDMCONTENT = require("../models/DDMContent");
const DDLRECORD = require("../models/DDLRecord");
const DDLRecordSet = require("../models/DDLRecordSet");

const APiFeatures = require("../Common/commonApiFeatures");

exports.getAllDataList = async (req, res) => {
  try {
    const aggregateQuery = DDLRecordSet.aggregate([
      {
        $lookup: {
          from: "ddlrecords",
          localField: "RECORDSETID",
          foreignField: "RECORDSETID",
          as: "records",
        },
      },
      {
        $lookup: {
          from: "ddmcontents",
          localField: "records.DDMSTORAGEID",
          foreignField: "CONTENTID",
          as: "content",
        },
      },
      {
        $project: {
          RECORDSETID: 1,
          NAME: 1,
          DDMSTRUCTUREID: 1,
          records: 1,
          content: 1,
        },
      },
    ]);

    const features = new APiFeatures(aggregateQuery, req.query);
    const ddlRecordSet = await features.pagination();

    res.status(200).json({
      status: "success",
      results: ddlRecordSet.length,
      data: ddlRecordSet,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteDataList = async (req, res) => {
  try {
    const { id } = req.params;

    const ddlRecords = await DDLRECORD.find({ RECORDSETID: id });

    // Delete All DDMCONTENT
    const ddmContents = ddlRecords.map((record) => record.DDMSTORAGEID);
    await DDMCONTENT.deleteMany({
      CONTENTID: { $in: ddmContents },
    });

    // Delete All DDLRECORDS
    await DDLRECORD.deleteMany({ RECORDSETID: id });

    // Delete DDLRECORDSET
    await DDLRecordSet.deleteOne({ RECORDSETID: id });

    res.status(200).json({ message: "Data List Deleted Successfully!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
