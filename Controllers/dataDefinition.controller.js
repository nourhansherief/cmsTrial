const APiFeatures = require("../Common/commonApiFeatures");
const DataDefinition = require("../models/DataDefinition");
const { generateUUID } = require("../Utilities/generateUID");

exports.getAllDataDefinitions = async (req, res) => {
  try {
    const features = new APiFeatures(DataDefinition.find() , req.query)
    const dataDefinitions = await features.pagination()

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
    if(!req.body.NAME || !req.body.DEFINITION || !req.body.USERNAME){
      throw new Error("Please Send : NAME , DEFINITION and USERNAME")
    }


    const dataDefinition = await DataDefinition.create(req.body);
    res.status(200).json({ message: "Created Successfully!" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getSingleDataDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    let castedId = id.length < 24 ? { STRUCTUREID: id } : { _id: id };

    const dataDefinition = await DataDefinition.find(castedId);
    res.status(200).json(dataDefinition);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteDataDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDefinition = await DataDefinition.findOneAndDelete({
      STRUCTUREID: id,
    });
    res.status(200).json({ message: "Data definition deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateDataDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    const { NAME, DEFINITION } = req.body;
    if (!NAME || !DEFINITION) {
      throw new Error("Please Send NAME and DEFINITION to Update");
    }

    const dataDefinition = await DataDefinition.updateOne(
      { STRUCTUREID: id },
      { NAME, DEFINITION },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Updated Successfully!",
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
