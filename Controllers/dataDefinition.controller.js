const APiFeatures = require("../Common/commonApiFeatures");
const AppErrorHandler = require("../Common/commonErrorHandler");
const DataDefinition = require("../models/DataDefinition");
const {updateDataDefinition} = require("../Utilities/updateDataDefinition")


exports.getAllDataDefinitions = async (req, res) => {
  // await DataDefinition.updateMany(
  //   {}, // Apply to all documents or specify a filter here
  //   [
  //     {
  //       $set: {
  //         "DEFINITION.fields": {
  //           $map: {
  //             input: "$DEFINITION.fields",
  //             as: "field",
  //             in: {
  //               // Set `label` and `key` based on the field name
  //               label: "$$field.name",
  //               name : "$$field.name",
  //               key: "$$field.name",
  //               defaultValue: "$$field.predefinedValue.en_US",
  //               defaultValueAr: "$$field.predefinedValue.ar_SA",
  //               //data : "$$field.options",
  //               type: {
  //                 $switch: {
  //                   branches: [
  //                     {
  //                       case: { $eq: ["$$field.type", "text"] },
  //                       then: "textfield",
  //                     },
  //                     {
  //                       case: { $eq: ["$$field.type", "textarea"] },
  //                       then: "textarea",
  //                     },
  //                     {
  //                       case: {
  //                         $or: [
  //                           { $eq: ["$$field.type", "ddm-number"] },
  //                           { $eq: ["$$field.type", "ddm-integer"] },
  //                         ],
  //                       },
  //                       then: "number",
  //                     },
  //                     // {
  //                     //   case : {
  //                     //     $eq: ["$$field.type" , "select"]
  //                     //   },
  //                     //   then : {
  //                     //     data : "$$field.options"
  //                     //   }
  //                     // }
  //                   ],
  //                   default: "$$field.type", // Fallback to original type if not matched
  //                 },
  //               },
  //               // Set other properties, such as defaultValue and validation


  //               validate: {
  //                 required: "$$field.required", // Fallback to false if undefined
  //               },
  //               required : "$$field.required",
  //               applyMaskOn: "change",
  //               autoExpand: false,
  //               tableView: true,
  //               input: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   ]
  // );

  const features = new APiFeatures(DataDefinition.find(), req.query);
  const dataDefinitions = await features.pagination().search().query;
  
  //   //Update documents in the collection
  // const updatedData = updateDataDefinition(dataDefinitions)
  //   for (const doc of updatedData) {
  //     await DataDefinition.updateOne({ STRUCTUREID: doc.STRUCTUREID}, doc);
  //   }

  res.status(200).json({
    status: "Success",
    results: dataDefinitions.length,
    data: dataDefinitions,
  });
};

exports.createDataDefinitions = async (req, res, next) => {
  if (!req.body.NAME || !req.body.DEFINITION || !req.body.USERNAME) {
    return next(
      new AppErrorHandler("Please Send : NAME , DEFINITION and USERNAME", 404)
    );
  }

  const dataDefinition = await DataDefinition.create(req.body);
  res.status(200).json({ message: "Created Successfully!" });
};

exports.getSingleDataDefinition = async (req, res) => {
  const { id } = req.params;

  const dataDefinition = await DataDefinition.find({ STRUCTUREID: id });

  res.status(200).json(dataDefinition);
};

exports.deleteDataDefinition = async (req, res) => {
  const { id } = req.params;

  const dataDefinition = await DataDefinition.findOneAndDelete({
    STRUCTUREID: id,
  });

  res.status(200).json({ message: "Data definition deleted successfully" });
};

exports.updateDataDefinition = async (req, res, next) => {
  const { id } = req.params;
  const { NAME, DEFINITION } = req.body;

  if (!NAME || !DEFINITION) {
    return next(
      new AppErrorHandler("Please Send NAME and DEFINITION to Update", 404)
    );
  }

  const dataDefinition = await DataDefinition.updateOne(
    { STRUCTUREID: id },
    { NAME, DEFINITION },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: "Updated Successfully!",
  });
};
