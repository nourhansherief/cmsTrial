const DDMContent = require("../models/DDMContent");

exports.getAllDataContent = async (req, res) => {
  try {
    const ddmContent = await DDMContent.find();
    res.status(200).json({
      status: "success",
      results: ddmContent.length,
      data: ddmContent,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getSingleDataContent = async (req, res) => {
  try {
    const { id } = req.params;
    const ddmContent = await DDMContent.find({ CONTENTID: id });
    res.status(200).json(ddmContent);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateDataContent = async (req, res) => {
  try {
    const { id } = req.params;
    const {DATA_} = req.body;
    if (!DATA_) {
      throw new Error("Please Send Only DATA_ To Update!");
    }
    const newDDmContent = await DDMContent.updateOne(
      { CONTENTID: id },
      { DATA_ },
      { new: true }
    );
    res.status(200).json({message : "Updated Successfully!"})
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
