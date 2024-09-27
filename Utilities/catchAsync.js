const AppErrorHandler = require("../Common/commonErrorHandler");

const catchAsyncHandler = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

const catchAsyncHandlerWithId = (fn) => (req, res, next, id) => {
  fn(req, res, next, id).catch(next);
};

module.exports = { catchAsyncHandler, catchAsyncHandlerWithId };
