"use strict";

const successResponse = (res, data, code = 200) => {
  if (data && data.docs) {
    data.data = data.docs;
    delete data.docs;
    res.response = data;
    return res.status(code).json({ data });
  }
  res.response = data;
  return res.status(code).json({ data });
};

const errorResponse = (res, error = "Oops. An Error Occurred", code = 500) => {
  res.response = error;
  console.log("errorResponse", error);
  return res.status(code).json({ error: error });
};

module.exports = { successResponse, errorResponse };
