const {
  RESPONSE_CODE,
} = require("../../config/constants/responseCodeConstant");
const responseCode = require("../utils/responseCode");
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error(err?.message ? err.message : err);
    res.status(responseCode.validationError).json({
      code: RESPONSE_CODE.ERROR,
      message: err?.message ? err.message : err,
    });
  });
};

module.exports = catchAsync;
