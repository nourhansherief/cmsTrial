const convert = require("xml-js");
const {xmlToJson} = require('./xmlToJson')

const convertXmlNameToJson = async (model) => {
  try {
    const docs = await model.find();
    for (let doc of docs) {
      const currentValue = doc.NAME;

      //let name = xmlToJson(currentValue)?.root?.Name

      const xmlToJson = convert.xml2json(currentValue, {
        compact: true,
        spaces: 4,
      });

      let name = JSON.parse(xmlToJson)?.root?.Name;

      if (name?.constructor !== Array) {
        name = name._text;
      } else {
        name = name.at(-1)?._text;
      }

      doc.NAME = name;
      await doc.save();
    }

    console.log("All documents Updated successfully.");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { convertXmlNameToJson };
