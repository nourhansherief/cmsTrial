const DDLRecordSet = require("../models/DDLRecordSet");

exports.getAllRecordSetWithDataDefinition = async (req, res) => {
  try {
    const ddlRecordSetWithDataDefinition = await DDLRecordSet.find()
    .populate({
      path: "DDMSTRUCTUREID",
      model: "ddmstructure",
      localField: "DDMSTRUCTUREID",
      foreignField: "STRUCTUREID",
      justOne: true,
      select: "STRUCTUREID NAME DEFINITION",
    });

    res.status(200).json({
      status: "success",
      results: ddlRecordSetWithDataDefinition.length,
      data: ddlRecordSetWithDataDefinition,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRecordSet = async (req, res) => {
  try {
    const dataRecordSet = await DDLRecordSet.find();
    res.status(200).json({
      status: "success",
      results: dataRecordSet.length,
      data: dataRecordSet,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateName = async (req, res) => {
  try {
    const { id } = req.params;
    let castedId = id.length < 24 ? { RECORDSETID: id } : { _id: id };
    const { NAME } = req.body;
    if (!NAME) {
      throw new Error("Please Send NAME to update the Document");
    }
    const updatedData = await DDLRecordSet.updateOne(
      castedId,
      { $set: { NAME: NAME } },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Updated Successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createRecordSet = async (req, res) => {
  try {
    const body = req.body;
    const dataRecordSet = await DDLRecordSet.create(body);
    res.status(200).json({ message: "Created Successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSingleRecordSet = async (req, res) => {
  try {
    const { id } = req.params;
    const recordSet = await DDLRecordSet.find({ RECORDSETID: id }).populate({
      path: "DDMSTRUCTUREID",
      model: "ddmstructure",
      localField: "DDMSTRUCTUREID",
      foreignField: "STRUCTUREID",
      justOne: true,
      select: "STRUCTUREID NAME DEFINITION",
    });
    res.status(200).json(recordSet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
