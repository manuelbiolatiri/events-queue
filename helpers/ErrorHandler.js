const { errorResponse } = require("./response");

let handler = (err, req, res, next) => {
  res.statusCode = res.statusCode || 500;
  console.log(err.message);
  return errorResponse(res, err.message, err.statusCode);
};

module.exports = handler;
