const DataDefinition = require("../models/DataDefinition");

exports.getAllDataDefinitions = async (req, res) => {
  try {
    const dataDefinitions = await DataDefinition.find();
    res.status(200).json({
      status: "Success",
      results: dataDefinitions.length,
      data: dataDefinitions,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.createDataDefinitions = async (req, res) => {
  try {
    const { name, structure } = req.body;
    const dataDefinition = await DataDefinition.create({ name, structure });
    res.status(200).json(dataDefinition);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getSingleDataDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDefinition = await DataDefinition.findById(id);
    res.status(200).json({ status: "success", data: dataDefinition });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteDataDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDefinition = await DataDefinition.findByIdAndDelete(id);
    res.status(200).json({ message: "Data definition deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateDataDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, structure } = req.body;
    const dataDefinition = await DataDefinition.findByIdAndUpdate(
      id,
      { name, structure },
      { new: true }
    );
    res
      .status(200)
      .json({
        status: "status",
        message: "Updated Successfully!",
        data: dataDefinition,
      });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
