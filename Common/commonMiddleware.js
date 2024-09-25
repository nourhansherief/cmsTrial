const mongoose = require("mongoose");

exports.checkIsIdValid = (model) => {
  return async (req, res, next, id) => {
    try {
      // let castedId =
      //   id.length < 24
      //     ? { $or: [{ STRUCTUREID: id }, { RECORDSETID: id } , {CONTENTID : id}] }
      //     : { _id: id };

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
        return res.status(400).json({
          message: `CheckIdIsValidMiddleware : Invalid ID , There is no Document With This ID : ${id}`,
        });
      }

      next();
    } catch (error) {
      console.log("CDs");
      return res.status(400).json({ message: error.message });
    }
  };
};

exports.checkReqBody = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Please Send a Request Body!" });
    }
  }

  next();
};

