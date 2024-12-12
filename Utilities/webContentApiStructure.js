const webContentApiStructure = (webPageName, lang, data) => {
  let { dataLists, records, contents } = data;

  // Set the contents in the dataLists obj
  dataLists = dataLists
    .filter((item) => {
      let dataListName = item?.NAME?.split("_")[2] ?? '';
      return dataListName.toLowerCase() !== "parent";
    })
    .map((item) => {
      let dataListName = item?.NAME?.split("_")[2];

      return {
        ...item.toObject(),
        content: records.reduce((res, record) => {
          if (item.RECORDSETID == record.RECORDSETID) {
            contents.forEach((content) => {
              if (record.DDMSTORAGEID == content.CONTENTID) {
                const fieldValues = structureFieldValues(
                  JSON.parse(content.DATA_).fieldValues,
                  lang
                );

                if (dataListName == fieldValues.parentID) {
                  if (!res[fieldValues.parentID]) {
                    res[fieldValues.parentID] = {};
                  }

                  res[fieldValues.parentID][fieldValues.webObjectName] =
                    fieldValues;
                } else if (fieldValues.parentID == 0) {
                  res[fieldValues.webObjectName] = fieldValues;
                }
              }
            });
          }
          return res;
        }, {}),
      };
    });


  const structure = dataLists.reduce((res, data) => {
    return { ...res, ...data.content };
  }, {});

  const finalData = {
    [webPageName]: structure,
  };

  return finalData;
};

const structureFieldValues = (data, lang) => {
  const res = data.reduce((result, obj) => {
    result[obj.name] =
      typeof obj.value == "string"
        ? obj.value
        : lang == "ar"
        ? obj.value.ar_SA
        : obj.value.en_US;

    return result;
  }, {});

  return res;
};

module.exports = webContentApiStructure;
