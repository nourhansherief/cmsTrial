const DDLRecordSet = require("../models/DDLRecordSet");
const DataDefinition = require("../models/DataDefinition");

const APiFeatures = require("../Common/commonApiFeatures");
const AppErrorHandler = require("../Common/commonErrorHandler");

exports.getAllRecordSetWithDataDefinition = async (req, res) => {
  try {
    const aggregateRecordSet = DDLRecordSet.aggregate([
      {
        $lookup: {
          from: "ddmstructures",
          localField: "DDMSTRUCTUREID",
          foreignField: "STRUCTUREID",
          as: "data",
        },
      },
      {
        $project: {
          RECORDSETID: 1,
          NAME: 1,
          DDMSTRUCTUREID: 1,
          DataDefinition: {
            $map: {
              input: "$data",
              as: "item",
              in: {
                STRUCTUREID: "$$item.STRUCTUREID",
                NAME: "$$item.NAME",
                DEFINITION: "$$item.DEFINITION",
              },
            },
          },
        },
      },
    ]);

    const features = new APiFeatures(aggregateRecordSet , req.query)
    const ddlRecordSetWithDataDefinition = await features.pagination()
    
    res.status(200).json({
      status: "success",
      results: ddlRecordSetWithDataDefinition.length,
      data: ddlRecordSetWithDataDefinition,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// exports.getAllRecordSet = async (req, res) => {
//   try {
//     const features = new APiFeatures(DDLRecordSet.find(), req.query);
//     const dataRecordSet = await features.pagination();

//     res.status(200).json({
//       status: "success",
//       results: dataRecordSet.length,
//       data: dataRecordSet,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


exports.getAllRecordSet = async (req, res , next) => {
  const features = new APiFeatures(DDLRecordSet.find(), req.query);
  const dataRecordSet = await features.pagination();

  return res.status(200).json({
    status: "success",
    results: dataRecordSet.length,
    data: dataRecordSet,
  });

  next(new AppErrorHandler('cjkdsnckjdsnc' , 400))
}

exports.updateName = async (req, res) => {
  try {
    const { id } = req.params;
    //let castedId = id.length < 24 ? { RECORDSETID: id } : { _id: id };
    const { NAME } = req.body;
    if (!NAME) {
      throw new Error("Please Send NAME to update the Document");
    }
    const updatedData = await DDLRecordSet.updateOne(
      { RECORDSETID: id },
      { $set: { NAME: NAME } },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Updated Successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createRecordSet = async (req, res , next) => {
  // try {
    const body = req.body;
    if(!body.NAME || !body.DDMSTRUCTUREID || !body.USERNAME){
      return next(new AppErrorHandler(`Please Send All These Parameters : NAME , DDMSTRUCTUREID , USERNAME` , 404))
      //throw new Error(`Please Send All These Parameters : NAME , DDMSTRUCTUREID , USERNAME`)
    }

    const ddmStructure = await DataDefinition.find({STRUCTUREID : body.DDMSTRUCTUREID})

    if(!ddmStructure || ddmStructure.length === 0){
      return next(new AppErrorHandler(`Please Send A Valid DDMSTRUCTUREID` , 404))
      //throw new Error('Please Send A Valid DDMSTRUCTUREID')
    }

    const dataRecordSet = await DDLRecordSet.create(body);
    res.status(200).json({ message: "Created Successfully!" });
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
};

exports.getSingleRecordSet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const recordSet = await DDLRecordSet.find({ RECORDSETID: id }).populate({
      path: "DDMSTRUCTUREID",
      model: "ddmstructure",
      localField: "DDMSTRUCTUREID",
      foreignField: "STRUCTUREID",
      justOne: true,
      select: "STRUCTUREID NAME DEFINITION",
    });
    res.status(200).json(recordSet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
