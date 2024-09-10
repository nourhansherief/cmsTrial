// const convertToJson = async (model, propertyValue) => {
//   try {
//     const docs = await model.find();
//     for (let doc of docs) {
//       const currentValue = doc[propertyValue];
      
//       doc[propertyValue] = JSON.parse(currentValue);

//       await doc.save();
//     }

//     console.log("All documents Updated successfully.");
//   } catch (error) {
//     console.error(error.message);
//   }
// };


const isValidJSON = (str) => {
  // Basic validation to ensure JSON strings are parseable
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const cleanJsonString = (str) => {
  return str.trim();
};

const convertToJson = async (model, propertyValue, batchSize = 1000) => {
  try {
    let skip = 0;
    let docs;

    do {
      // Fetch documents in batches
      docs = await model.find().skip(skip).limit(batchSize);

      for (let doc of docs) {
        const currentValue = doc[propertyValue];

        if (typeof currentValue === 'string') {
          const cleanedValue = cleanJsonString(currentValue);
          
          if (isValidJSON(cleanedValue)) {
            doc[propertyValue] = JSON.parse(cleanedValue);
            await doc.save();
          } else {
            console.error(`Skipping document ID ${doc._id}: Invalid JSON format.`);
          }
        } else {
          console.warn(`Skipping document ID ${doc._id}: Value is not a string.`);
        }
      }

      skip += batchSize;
    } while (docs.length > 0);

    console.log("All documents updated successfully.");
  } catch (error) {
    console.error(`General error during conversion: ${error.message}`);
  }
};



module.exports = { convertToJson };
