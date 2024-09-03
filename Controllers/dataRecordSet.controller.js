const DDLRecordSet = require("../models/DDLRecordSet");

exports.getAllDataRecordSet = async (req, res) => {
  try {
    const ddlRecordSet = await DDLRecordSet.find().populate('DataDefinition')
    res
      .status(200)
      .json({
        status: "success",
        results: ddlRecordSet.length,
        data: ddlRecordSet,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
