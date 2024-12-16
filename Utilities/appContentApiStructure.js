const appContentStructure = (prefix, ratePlan, id, data) => {
  let { dataLists, records, contents } = data;

  dataLists = dataLists.map((item) => {
    return {
      content: records.reduce((res, record) => {
        if (item.RECORDSETID == record.RECORDSETID) {
          contents.forEach((content) => {
            if (record.DDMSTORAGEID == content.CONTENTID) {
              let fieldValues = structureFieldValues(
                JSON.parse(content.DATA_).fieldValues
              );

              for (let key in fieldValues) {
                let parsedRatePlan = JSON.parse(fieldValues["ratePlan"]);
                if (
                  key == "ratePlan" &&
                  parsedRatePlan &&
                  parsedRatePlan?.includes(ratePlan)
                ) {
                  const { ratePlan, ...rest } = fieldValues;
                  res.push(rest);
                }
              }
            }
          });
        }
        return res;
      }, []),
    };
  });

  const structure = dataLists.map((list) => {
    return list.content;
  });

  const finalStructure = {
    dynamicPortals: {
      id: id,
      [prefix]: structure[0],
    },
  };

  return finalStructure;
};

const structureFieldValues = (data) => {
  const res = data.reduce((result, obj) => {
    result[obj.name] =
      typeof obj.value == "string" ? obj.value : obj.value.en_US;
    return result;
  }, {});

  return res;
};

module.exports = appContentStructure;
