const APiFeatures = require("../Common/commonApiFeatures");
const AppErrorHandler = require("../Common/commonErrorHandler");
const DataDefinition = require("../models/DataDefinition");

exports.getAllDataDefinitions = async (req, res) => {
  const features = new APiFeatures(DataDefinition.find(), req.query);
  const dataDefinitions = await features.pagination();

  res.status(200).json({
    status: "Success",
    results: dataDefinitions.length,
    data: dataDefinitions,
  });
};

exports.createDataDefinitions = async (req, res, next) => {
  if (!req.body.NAME || !req.body.DEFINITION || !req.body.USERNAME) {
    return next(
      new AppErrorHandler("Please Send : NAME , DEFINITION and USERNAME", 404)
    );
  }

  const dataDefinition = await DataDefinition.create(req.body);
  res.status(200).json({ message: "Created Successfully!" });
};

exports.getSingleDataDefinition = async (req, res) => {
  const { id } = req.params;

  const dataDefinition = await DataDefinition.find({ STRUCTUREID: id });

  res.status(200).json(dataDefinition);
};

exports.deleteDataDefinition = async (req, res) => {
  const { id } = req.params;

  const dataDefinition = await DataDefinition.findOneAndDelete({
    STRUCTUREID: id,
  });

  res.status(200).json({ message: "Data definition deleted successfully" });
};

exports.updateDataDefinition = async (req, res, next) => {
  const { id } = req.params;
  const { NAME, DEFINITION } = req.body;

  if (!NAME || !DEFINITION) {
    return next(
      new AppErrorHandler("Please Send NAME and DEFINITION to Update", 404)
    );
  }

  const dataDefinition = await DataDefinition.updateOne(
    { STRUCTUREID: id },
    { NAME, DEFINITION },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: "Updated Successfully!",
  });
};
