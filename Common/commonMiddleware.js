const mongoose = require("mongoose");
const AppErrorHandler = require("../Common/commonErrorHandler");
const {
  catchAsyncHandlerWithId,
} = require("../Utilities/catchAsync");

exports.checkIsIdValid = (model) => {
  return catchAsyncHandlerWithId(async (req, res, next, id) => {
    let castedId = {
      $or: [
        { STRUCTUREID: id },
        { RECORDSETID: id },
        { CONTENTID: id },
        { RECORDID: id },
      ],
    };

    const doc = await model.find(castedId);

    if (!doc || doc.length === 0) {
      return next(
        new AppErrorHandler(
          `Invalid ID , There is no Document With This ID : ${id}`,
          400
        )
      );
    }

    next();
  });
};

exports.checkReqBody = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    if (Object.keys(req.body).length === 0) {
      return next(new AppErrorHandler("Please Send a Request Body!", 400));
    }
  }

  next();
};
