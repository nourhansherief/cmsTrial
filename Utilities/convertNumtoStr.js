const convertNumToStr = async (model, propValue) => {
  try {
    const docs = await model.find({ [propValue]: { $type: "number" } });
    const bulkOps = docs.map((doc) => {
      return {
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: { [propValue]: doc[propValue].toString() } },
        },
      };
    });

    if (bulkOps.length > 0) {
      await model.bulkWrite(bulkOps);
      console.log("Bulk conversion to string completed.");
    } else {
      console.log("No documents found with numeric values.");
    }
  } catch (error) {
    console.error("Bulk update error:", error.message);
  }
};

module.exports = convertNumToStr;
