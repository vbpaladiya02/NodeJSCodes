const responseStatusCode = require("./responseCode");
const {
  RESPONSE_CODE,
} = require("../config/constants/responseCodeConstant");
const apiMessage = require("./apiMessage");

exports.unAuthenticated = (res) => {
  return res.status(responseStatusCode.unAuthenticated).json({
    code: RESPONSE_CODE.UNAUTHENTICATED,
    message: "Unauthenticated.",
    data: {},
  });
};
exports.successResponse = (data, res) => {
  return res.status(responseStatusCode.success).json({
    code: RESPONSE_CODE.DEFAULT,
    message: res.message,
    data: data,
  });
};
exports.failureResponse = (data, res) => {
  res.message = data.message ? data.message : data;
  return res.status(responseStatusCode.validationError).json({
    code: RESPONSE_CODE.ERROR,
    message: res.message,
  });
};
exports.recordNotFound = (res) => {
  return res.status(responseStatusCode.notFound).json({
    code: RESPONSE_CODE.ERROR,
    message: apiMessage.notFound,
    data: {},
  });
};
exports.badRequest = (res) => {
  return res.status(responseStatusCode.validationError).json({
    code: RESPONSE_CODE.ERROR,
    message: apiMessage.badRequest,
    data: {},
  });
};

exports.inValidParam = (message, res) => {
  message = message.replace(/"/g, "");
  res.message = message;
  return res.status(responseStatusCode.validationError).json({
    code: RESPONSE_CODE.ERROR,
    message: message,
    data: {},
  });
};
