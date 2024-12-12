const { startSession } = require("mongoose");

// Models (Collections)
const DDMCONTENT = require("../models/DDMContent");
const DDLRECORD = require("../models/DDLRecord");
const DDLRecordSet = require("../models/DDLRecordSet");

const APiFeatures = require("../Common/commonApiFeatures");
const DataDefinition = require("../models/DataDefinition");
const webContentApiStructure = require("../Utilities/webContentApiStructure");

exports.getAllDataList = async (req, res, next) => {
  // In-Case you need all the Datalist with it's content

  // const aggregateQuery = DDLRecordSet.aggregate([
  //   {
  //     $lookup: {
  //       from: "ddlrecords",
  //       localField: "RECORDSETID",
  //       foreignField: "RECORDSETID",
  //       as: "records",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "ddmcontents",
  //       localField: "records.DDMSTORAGEID",
  //       foreignField: "CONTENTID",
  //       as: "content",
  //     },
  //   },
  //   {
  //     $project: {
  //       RECORDSETID: 1,
  //       NAME: 1,
  //       DDMSTRUCTUREID: 1,
  //       records: 1,
  //       content: 1,
  //     },
  //   },
  // ]);

  const features = new APiFeatures(DDLRecordSet.find(), req.query);
  const ddlRecordSet = await features.pagination().search().query;

  res.status(200).json({
    status: "success",
    results: ddlRecordSet.length,
    data: ddlRecordSet,
  });
};

exports.deleteDataList = async (req, res, next) => {
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
};

exports.getSingleDataList = async (req, res, next) => {
  const { id } = req.params;

  const ddlRecords = await DDLRECORD.find({ RECORDSETID: id });

  const ddmContents = ddlRecords.map((record) => record.DDMSTORAGEID);

  const ddmContentValues = await DDMCONTENT.find({
    CONTENTID: { $in: ddmContents },
  });

  const records = ddlRecords.map((record) => {
    return {
      record,
      content: ddmContentValues
        .map((content) =>
          content.CONTENTID == record.DDMSTORAGEID ? content : null
        )
        .filter((value) => value),
    };
  });

  res.status(200).json({ records: records });
};

exports.getWebContent = async (req, res, next) => {
  const { prefix } = req.params;
  const { lang } = req.query;

  const webPageName = prefix.split("_")[1];

  let regex = new RegExp(prefix, "i");

  const dataLists = await DDLRecordSet.find({ NAME: regex });

  const records = await DDLRECORD.find({
    RECORDSETID: dataLists.map((record) => {
      return record.RECORDSETID;
    }),
  });

  const contents = await DDMCONTENT.find({
    CONTENTID: records.map((record) => {
      return record.DDMSTORAGEID;
    }),
  });

  let obj = {
    dataLists,
    records,
    contents,
  };

  res.status(200).json(webContentApiStructure(webPageName, lang, obj));
};
