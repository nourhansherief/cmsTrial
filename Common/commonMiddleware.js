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
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
