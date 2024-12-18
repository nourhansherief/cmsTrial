const DDLRecordSet = require("../models/DDLRecordSet");
const DataDefinition = require("../models/DataDefinition");

const APiFeatures = require("../Common/commonApiFeatures");
const AppErrorHandler = require("../Common/commonErrorHandler");

exports.getAllRecordSetWithDataDefinition = async (req, res , next) => {
  const aggregateRecordSet = DDLRecordSet.aggregate([
    {
      $lookup: {
        from: "ddmstructures",
        localField: "DDMSTRUCTUREID",
        foreignField: "STRUCTUREID",
        as: "data",
      },
    },
    {
      $project: {
        RECORDSETID: 1,
        NAME: 1,
        DDMSTRUCTUREID: 1,
        DataDefinition: {
          $map: {
            input: "$data",
            as: "item",
            in: {
              STRUCTUREID: "$$item.STRUCTUREID",
              NAME: "$$item.NAME",
              DEFINITION: "$$item.DEFINITION",
            },
          },
        },
      },
    },
  ]);

  const features = new APiFeatures(aggregateRecordSet, req.query);
  const ddlRecordSetWithDataDefinition = await features.pagination();

  res.status(200).json({
    status: "success",
    results: ddlRecordSetWithDataDefinition.length,
    data: ddlRecordSetWithDataDefinition,
  });
};

exports.getAllRecordSet = async (req, res, next) => {
  const features = new APiFeatures(DDLRecordSet.find(), req.query);
  const dataRecordSet = await features.pagination();

  return res.status(200).json({
    status: "success",
    results: dataRecordSet.length,
    data: dataRecordSet,
  });
};

exports.updateName = async (req, res, next) => {
  const { id } = req.params;

  const { NAME } = req.body;
  if (!NAME) {
    return next(
      new AppErrorHandler("Please Send NAME to update the Document", 404)
    );
  }
  const updatedData = await DDLRecordSet.updateOne(
    { RECORDSETID: id },
    { $set: { NAME: NAME } },
    { new: true, runValidators: true }
  );

  res.status(200).json({ message: "Updated Successfully!" });
};

exports.createRecordSet = async (req, res, next) => {
  const body = req.body;
  if (!body.NAME || !body.DDMSTRUCTUREID || !body.USERNAME) {
    return next(
      new AppErrorHandler(
        `Please Send All These Parameters : NAME , DDMSTRUCTUREID , USERNAME`,
        404
      )
    );
  }

  const ddmStructure = await DataDefinition.find({
    STRUCTUREID: body.DDMSTRUCTUREID,
  });

  if (!ddmStructure || ddmStructure.length === 0) {
    return next(new AppErrorHandler(`Please Send A Valid DDMSTRUCTUREID`, 404));
  }

  const dataRecordSet = await DDLRecordSet.create(body);
  res.status(200).json({ message: "Created Successfully!" });
};

exports.getSingleRecordSet = async (req, res) => {
  const { id } = req.params;

  const recordSet = await DDLRecordSet.find({ RECORDSETID: id }).populate({
    path: "DDMSTRUCTUREID",
    model: "ddmstructure",
    localField: "DDMSTRUCTUREID",
    foreignField: "STRUCTUREID",
    justOne: true,
    select: "STRUCTUREID NAME DEFINITION PARENTSTRUCTUREID",
  });

  res.status(200).json(recordSet);
};
