const authService = require("../services/auth");

const login = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  let result = await authService.loginUser(email.toLowerCase(), password);
  if (result) {
      res.message = apiMessages.auth.login
      return util.successResponse(result, res);
  } else {
    res.message = apiMessages.auth.notFound
    return util.failureResponse(res);
  }
});

const registerUser = catchAsync(async (req, res) => {
  const data = {...req.body};
  const result = await authService.registerUser(data);
  res.message = apiMessages.auth.register
  return util.successResponse(result, res);
});

module.exports = {
  login,
  registerUser
};
