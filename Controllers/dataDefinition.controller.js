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
    const dataDefinition = await DataDefinition.create(req.body);
    res.status(200).json({message : "Created Successfully!"});
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getSingleDataDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDefinition = await DataDefinition.findById(id);
    res.status(200).json(dataDefinition);
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
    const { NAME, DEFINITION } = req.body;
    if(!NAME && !DEFINITION){
      throw new Error ("Please Send NAME or DEFINITION to Update")
    }

    const dataDefinition = await DataDefinition.findByIdAndUpdate(
      id,
      { NAME, DEFINITION},
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Updated Successfully!",
      theUpdatedDataDefinition: dataDefinition,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
