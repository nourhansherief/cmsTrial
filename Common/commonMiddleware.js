exports.checkIsIdValid = (model) => {
  return async (req, res, next, id) => {
    try {
      const doc = await model.findById(id);
      if (!doc) {
        return res.status(400).json({
          message: `Invalid ID , There is no Document With This ID : ${id}`,
        });
      }

      next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
};

exports.checkReqBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Please Send a Request Body!" });
  }

  next();
};
