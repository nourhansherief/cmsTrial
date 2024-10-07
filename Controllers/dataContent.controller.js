const DDMContent = require("../models/DDMContent");
const APiFeatures = require("../Common/commonApiFeatures");

exports.getAllDataContent = async (req, res) => {
  const features = new APiFeatures(DDMContent.find(), req.query);
  const ddmContent = await features.pagination();

  res.status(200).json({
    status: "success",
    results: ddmContent.length,
    data: ddmContent,
  });
};

exports.getSingleDataContent = async (req, res) => {
  const { id } = req.params;

  const ddmContent = await DDMContent.find({ CONTENTID: id });

  res.status(200).json(ddmContent);
};

exports.updateDataContent = async (req, res, next) => {
  const { id } = req.params;
  const { DATA_ } = req.body;

  if (!DATA_) {
    return next("Please Send Only DATA_ To Update!", 404);
  }

  const newDDmContent = await DDMContent.updateOne(
    { CONTENTID: id },
    { DATA_ },
    { new: true }
  );

  res.status(200).json({ message: "Updated Successfully!" });
};
