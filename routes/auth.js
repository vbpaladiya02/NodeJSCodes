const express = require("express");
const routes = express.Router();
const authController = require("../controllers/authController");
const validate = require('../middlewares/validate');
const validations = require('../utils/validations/authValidation');
routes.post("/register", validate(validations.registerKeys), authController.registerUser);
routes.post("/login", authController.login);


module.exports = routes;
