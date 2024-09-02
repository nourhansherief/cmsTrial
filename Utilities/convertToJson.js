const convertToJson = async (model , propertyValue) => {
    try {
      const docs = await model.find();
  
      for (let doc of docs) {
        const currentValue = doc[propertyValue];

        doc[propertyValue] = JSON.parse(currentValue)

        await doc.save();
      }
  
      console.log('All documents Updated successfully.');
    } catch (error) {
      console.error(error.message);
    }
  }

module.exports = {convertToJson}