const convert = require("xml-js");

const XmlToJson = (xml) => {
  const xmlToJson = convert.xml2json(xml, { compact: true, spaces: 4 });
  return JSON.parse(xmlToJson);
};

module.exports = { XmlToJson };
