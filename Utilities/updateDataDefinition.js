const { ObjectId } = require("mongodb");

const updateDataDefinition = (data) => {
  let newDataDefinition = data.map((df) => {
    return {
      ...df.toObject(),
      DEFINITION: {
        ...df.toObject().DEFINITION,
        fields: df.DEFINITION.fields.map((field) => {
          return {
            label: field.name,
            type: convertType(field.type),
            defaultValue: field.predefinedValue.en_US,
            defaultValueAr: field.predefinedValue.ar_SA,
            validate: { required: field.required },
            applyMaskOn: "change",
            autoExpand: false,
            tableView: true,
            input: true,
            data:
              field.type == "select"
                ? handleSpecialTypes(field.type, field?.options)
                : undefined,
            values:
              field.type == "radio"
                ? handleSpecialTypes(field.type, field?.options)
                : undefined,
          };
        }),
      },
    };
  });

  return newDataDefinition;
};

const convertType = (type) => {
  switch (type) {
    case "text":
      return "textfield";
    case "ddm-number":
      return "number";
    case "ddm-integer":
      return "number";

    default:
      return type;
  }
};

const handleSpecialTypes = (type, options) => {
  if (type == "select") {
    let values = options.map((value) => {
      return {
        values: [
          {
            label: value?.label?.en_US,
            value: value?.value,
          },
        ],
      };
    });

    return values[0];
  } else if (type == "radio") {
    let values = options.map((value) => {
      return {
        label: value?.label?.en_US,
        value: value?.value,
      };
    });

    return values;
  }
};

module.exports = { updateDataDefinition };
